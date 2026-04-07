import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@mui/material';
import { useFieldArray, useForm, useWatch } from 'react-hook-form';
import {
  ControlledDateInput,
  ControlledSelectInput,
  CustomTypography,
  FormContainer,
  FormErrorMessage,
  type ISelectOptions,
} from '../../../../components';
import { CustomStack } from '../../../../components/grids';
import { TApolloError } from '../../../../types/apollo';
import { getNumberOptions } from '../../../../utils';
import BatchResultConfirmation from '../../components/BatchResultConfirmation';
import GameweekTeamsInput from './GameweekTeamsInput';
import { BatchResultSchema, BatchResultFormData } from './schema';

export type MatchRow = {
  homeTeam: string;
  awayTeam: string;
  kickoffTime?: string | null;
  homeGoals?: string | number;
  awayGoals?: string | number;
  isForfeit?: boolean;
  isComplete?: boolean;
};

interface Props {
  onSubmit: (formData: BatchResultFormData) => void;
  competitionOptions: ISelectOptions[];
  teamOptions: ISelectOptions[];
  orgSeasonOptions: ISelectOptions[];
  defaultValues: BatchResultFormData;
  loading: boolean;
  error?: TApolloError;
}

export default function BatchResultForm({
  onSubmit,
  defaultValues,
  competitionOptions,
  teamOptions,
  orgSeasonOptions,
  loading,
  error,
}: Props) {
  const {
    handleSubmit,
    control,
    formState: { errors, isDirty, isValid },
    reset,
  } = useForm({
    defaultValues,
    resolver: zodResolver(BatchResultSchema),
    mode: 'onChange',
  });

  const { fields, append, remove } = useFieldArray({ name: 'matches', control });
  const matches = useWatch({ control, name: 'matches' }) || [];
  const currentValues = useWatch({ control });

  return (
    <FormContainer
      onSubmit={handleSubmit(onSubmit)}
      submitBtn={{
        disabled: !isDirty || !isValid,
        confirm: {
          show: true,
          title: 'Results / Fixtures to add:',
          content: (
            <BatchResultConfirmation
              results={currentValues as BatchResultFormData}
              teamOptions={teamOptions}
            />
          ),
        },
      }}
      onReset={() => reset(defaultValues)}
      loading={loading}
      error={error}
    >
      <ControlledDateInput control={control} name="date" label="Date" disableFuture={false} />
      <ControlledSelectInput
        control={control}
        name="orgSeasonId"
        label="Season"
        options={orgSeasonOptions}
      />
      <ControlledSelectInput
        control={control}
        name="gameWeek"
        label="Game Week"
        options={getNumberOptions(52, 0)}
      />
      <ControlledSelectInput
        control={control}
        name="competitionId"
        label="Competition"
        options={competitionOptions}
      />

      <CustomStack direction="row" justify="space-between">
        <CustomTypography>Matches</CustomTypography>
        <Button
          color="primary"
          onClick={() =>
            append({
              homeTeam: '',
              awayTeam: '',
              kickoffTime: '10:00',
            })
          }
        >
          Add Match
        </Button>
      </CustomStack>
      {errors.matches ? <FormErrorMessage error={errors.matches} /> : null}

      {fields.map((f, idx) => {
        const excludedTeams = matches
          .flatMap((m, i) => (i === idx ? [] : [m?.homeTeam, m?.awayTeam]))
          .filter(Boolean) as string[];

        const currentHome = matches[idx]?.homeTeam as string | undefined;
        const currentAway = matches[idx]?.awayTeam as string | undefined;

        return (
          <GameweekTeamsInput
            key={f.id}
            index={idx}
            control={control}
            teamOptions={teamOptions}
            remove={remove}
            excludedTeams={excludedTeams}
            currentHome={currentHome}
            currentAway={currentAway}
          />
        );
      })}
    </FormContainer>
  );
}
