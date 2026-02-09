import { ApolloError } from '@apollo/client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { FormContainer, ControlledDateInput, ControlledSelectInput } from '../../../../components';
import type { ISelectOptions } from '../../../../components';
import { getIntegers } from '../../../../utils/helpers';
import type { ResultFormData } from './validation';
import { ResultSchema } from './validation';

interface Props {
  onSubmit: (formData: ResultFormData) => void;
  competitionOptions: ISelectOptions[];
  teamOptions: ISelectOptions[];
  orgSeasonOptions: ISelectOptions[];
  defaultValues: ResultFormData;
  loading: boolean;
  error?: ApolloError;
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
  const { handleSubmit, control } = useForm<ResultFormData>({
    defaultValues,
    resolver: zodResolver(ResultSchema),
    mode: 'onChange',
  });

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
        options={getIntegers(52, 1)}
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
      <ControlledSelectInput
        control={control}
        name="homeGoals"
        label="Goals"
        options={getIntegers(50, 0)}
      />
      <ControlledSelectInput
        control={control}
        name="awayTeam"
        label="Away Team"
        options={teamOptions}
      />
      <ControlledSelectInput
        control={control}
        name="awayGoals"
        label="Goals"
        options={getIntegers(50, 0)}
      />
    </FormContainer>
  );
}
