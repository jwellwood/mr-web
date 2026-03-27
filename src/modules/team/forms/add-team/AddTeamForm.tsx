import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  FormContainer,
  ControlledTextInput,
  ControlledSelectInput,
  ControlledDateInput,
  ControlledSwitchInput,
  type ISelectOptions,
} from '../../../../components';
import { TeamDetailsSchema, type TeamFormData } from './types';

interface Props {
  onSubmit: (data: TeamFormData) => void;
  defaultValues: TeamFormData;
  countryOptions: ISelectOptions[];
  loading: boolean;
}

export default function AddTeamForm({ onSubmit, defaultValues, countryOptions, loading }: Props) {
  const {
    handleSubmit,
    control,
    formState: { isValid, isDirty },
    reset,
  } = useForm<TeamFormData>({
    defaultValues,
    resolver: zodResolver(TeamDetailsSchema),
    mode: 'onChange',
  });

  return (
    <FormContainer
      onSubmit={handleSubmit(onSubmit)}
      submitBtn={{ disabled: !isDirty || !isValid }}
      onReset={() => reset(defaultValues)}
      loading={loading}
    >
      <ControlledTextInput control={control} name="teamName" label="Team Name" />
      <ControlledDateInput control={control} name="yearFounded" label="Year Founded" view="year" />
      <ControlledTextInput control={control} name="location" label="City" />
      <ControlledSelectInput
        control={control}
        name="country"
        label="Country"
        options={countryOptions}
      />
      <ControlledSwitchInput name="isActive" label="Is currently active" control={control} />
    </FormContainer>
  );
}
