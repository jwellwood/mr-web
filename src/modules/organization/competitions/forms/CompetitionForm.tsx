import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  FormContainer,
  ControlledTextInput,
  ControlledSelectInput,
  ControlledSwitchInput,
} from '../../../../components';
import { TApolloError } from '../../../../types/apollo';
import { getNumberOptions } from '../../../../utils';
import { competitionOptions } from '../../constants';
import type { CompetitionFormData } from './validation';
import { CompetitionSchema } from './validation';

interface Props {
  onSubmit: (data: CompetitionFormData) => void;
  defaultValues: CompetitionFormData;
  loading: boolean;
  error?: TApolloError;
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
        options={getNumberOptions(15)}
      />
      <ControlledSelectInput
        control={control}
        name="matchMinutes"
        label="Minutes Per Match"
        options={getNumberOptions(120, 5, 5)}
      />
      <ControlledSwitchInput control={control} name="isActive" label="Currently active?" />
    </FormContainer>
  );
}
