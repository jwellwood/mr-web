import { ApolloError } from '@apollo/client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  FormContainer,
  ControlledTextInput,
  ControlledSelectInput,
  ControlledSwitchInput,
} from '../../../../components';
import { getMinutesOptions } from '../../../../utils';
import { getIntegers } from '../../../../utils/helpers';
import { competitionOptions } from '../../constants';
import type { CompetitionFormData } from './validation';
import { CompetitionSchema } from './validation';

interface Props {
  onSubmit: (data: CompetitionFormData) => void;
  defaultValues: CompetitionFormData;
  loading: boolean;
  error?: ApolloError;
}

export default function CompetitionForm({ onSubmit, defaultValues, loading, error }: Props) {
  const { handleSubmit, control } = useForm<CompetitionFormData>({
    defaultValues,
    resolver: zodResolver(CompetitionSchema),
    mode: 'onChange',
  });

  return (
    <FormContainer onSubmit={handleSubmit(onSubmit)} loading={loading} error={error}>
      <ControlledTextInput control={control} name="name" label="Competition Name" />
      <ControlledSelectInput
        control={control}
        name="competitionType"
        label="Competition Type"
        options={competitionOptions}
      />
      <ControlledSelectInput
        control={control}
        name="playersPerTeam"
        label="Players Per Team"
        options={getIntegers(15)}
      />
      <ControlledSelectInput
        control={control}
        name="matchMinutes"
        label="Minutes Per Match"
        options={getMinutesOptions(120)}
      />
      <ControlledSwitchInput control={control} name="isActive" label="Currently active?" />
    </FormContainer>
  );
}
