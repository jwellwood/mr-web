import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  FormContainer,
  ControlledDateInput,
  ControlledSelectInput,
  ControlledTextInput,
} from '../../../../components';
import type { ISelectOptions } from '../../../../components';
import { TApolloError } from '../../../../types/apollo';
import { getIntegers } from '../../../../utils/helpers';
import { SeasonSchema, type SeasonFormData } from './validation';

interface Props {
  onSubmit: (formData: SeasonFormData) => void;
  defaultValues: SeasonFormData;
  competitionOptions: ISelectOptions[];
  loading: boolean;
  error?: TApolloError;
}

export default function SeasonForm({
  onSubmit,
  defaultValues,
  competitionOptions,
  loading,
  error,
}: Props) {
  const { handleSubmit, control, watch } = useForm<SeasonFormData>({
    defaultValues,
    resolver: zodResolver(SeasonSchema),
    mode: 'onChange',
  });

  const totalTeams = watch('totalFinalPositions');
  return (
    <FormContainer onSubmit={handleSubmit(onSubmit)} loading={loading} error={error}>
      <ControlledDateInput control={control} name="yearStarted" label="Year Started" view="year" />
      <ControlledDateInput
        control={control}
        name="yearEnded"
        label="Year Ended"
        view="year"
        disableFuture={false}
      />
      <ControlledSelectInput
        control={control}
        name="division"
        label="Division"
        options={competitionOptions}
      />
      <ControlledSelectInput
        control={control}
        name="totalFinalPositions"
        label="Number of Teams"
        options={getIntegers(50, 0)}
      />
      {totalTeams ? (
        <ControlledSelectInput
          control={control}
          name="leaguePosition"
          label="Final Position"
          options={getIntegers(totalTeams, 0)}
        />
      ) : null}
      <ControlledTextInput multiline control={control} name="comment" label="Comment" />
    </FormContainer>
  );
}
