import { zodResolver } from '@hookform/resolvers/zod';
import { isFuture } from 'date-fns';
import { useForm } from 'react-hook-form';
import {
  FormContainer,
  ControlledDateInput,
  ControlledSelectInput,
  ControlledSwitchInput,
} from '../../../../components';
import type { ISelectOptions } from '../../../../components';
import { TApolloError } from '../../../../types/apollo';
import { getNumberOptions } from '../../../../utils';
import type { ResultFormData } from './validation';
import { ResultSchema } from './validation';

interface Props {
  onSubmit: (formData: ResultFormData) => void;
  competitionOptions: ISelectOptions[];
  teamOptions: ISelectOptions[];
  orgSeasonOptions: ISelectOptions[];
  defaultValues: ResultFormData;
  loading: boolean;
  error?: TApolloError;
}

export default function ResultForm({
  onSubmit,
  defaultValues,
  competitionOptions,
  teamOptions,
  orgSeasonOptions,
  loading,
  error,
}: Props) {
  const { handleSubmit, control, watch } = useForm<ResultFormData>({
    defaultValues,
    resolver: zodResolver(ResultSchema),
    mode: 'onChange',
  });

  const currentDate = watch('date');

  const isFutureMatch = isFuture(new Date(currentDate));

  return (
    <FormContainer onSubmit={handleSubmit(onSubmit)} loading={loading} error={error}>
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
        options={getNumberOptions(52, 1)}
      />
      <ControlledSelectInput
        control={control}
        name="competitionId"
        label="Competition"
        options={competitionOptions}
      />
      <ControlledSelectInput
        control={control}
        name="homeTeam"
        label="Home Team"
        options={teamOptions}
      />
      {!isFutureMatch && (
        <ControlledSelectInput
          control={control}
          name="homeGoals"
          label="Goals"
          options={getNumberOptions(50, 0)}
        />
      )}
      <ControlledSelectInput
        control={control}
        name="awayTeam"
        label="Away Team"
        options={teamOptions}
      />
      {!isFutureMatch && (
        <ControlledSelectInput
          control={control}
          name="awayGoals"
          label="Goals"
          options={getNumberOptions(50, 0)}
        />
      )}
      <ControlledSwitchInput control={control} name="isForfeit" label="Forfeit" />
      <ControlledSwitchInput control={control} name="isComplete" label="Completed" />
    </FormContainer>
  );
}
