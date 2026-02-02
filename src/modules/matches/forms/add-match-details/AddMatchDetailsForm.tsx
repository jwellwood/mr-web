import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ApolloError } from '@apollo/client';

import {
  FormContainer,
  ControlledDateInput,
  ControlledSelectInput,
  ControlledSwitchInput,
  type ISelectOptions,
} from '../../../../components';
import { getIntegers } from '../../../../utils/helpers';
import AddMatchDetailsSchema, { AddMatchDetailsFormValues } from './validation';

interface Props {
  onSubmit: (data: AddMatchDetailsFormValues) => void;
  defaultValues: AddMatchDetailsFormValues;
  seasonOptions: ISelectOptions[];
  opponentOptions: ISelectOptions[];
  competitionOptions: ISelectOptions[];
  loading: boolean;
  error?: ApolloError;
}

export default function AddMatchDetailsForm({
  onSubmit,
  defaultValues,
  seasonOptions,
  opponentOptions,
  competitionOptions,
  loading,
  error,
}: Props) {
  const { handleSubmit, control } = useForm<AddMatchDetailsFormValues>({
    defaultValues,
    resolver: zodResolver(AddMatchDetailsSchema),
  });

  return (
    <FormContainer
      onSubmit={handleSubmit(onSubmit)}
      submitBtn={{ text: 'Next' }}
      loading={loading}
      error={error}
    >
      <ControlledDateInput control={control} name="date" label="Date" disableFuture={false} />
      <ControlledSwitchInput control={control} name="isHome" label="Home?" />
      <ControlledSwitchInput control={control} name="isForfeit" label="Forfeit?" />
      <ControlledSelectInput
        control={control}
        name="opponentId"
        label="Opponent"
        options={opponentOptions}
      />
      <ControlledSelectInput
        control={control}
        name="competitionId"
        label="Competition"
        options={competitionOptions}
      />
      <ControlledSelectInput
        control={control}
        name="seasonId"
        label="Season"
        options={seasonOptions}
      />
      <ControlledSelectInput
        control={control}
        name="teamGoals"
        label="Goals Scored"
        options={getIntegers(99)}
      />
      <ControlledSelectInput
        control={control}
        name="opponentGoals"
        label="Goals Conceded"
        options={getIntegers(99)}
      />
    </FormContainer>
  );
}
