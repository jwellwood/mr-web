import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { useNationality } from '../../../../hooks';
import {
  FormContainer,
  ControlledTextInput,
  ControlledDateInput,
  ControlledSelectInput,
} from '../../../../components';
import { EditProfileSchema, type EditProfileFormData } from './validation';

interface Props {
  onSubmit: (event: EditProfileFormData) => Promise<void> | void;
  defaultValues: EditProfileFormData;
  loading: boolean;
}

export default function EditProfileForm({ onSubmit, defaultValues, loading }: Props) {
  const { handleSubmit, control } = useForm<EditProfileFormData>({
    defaultValues,
    resolver: zodResolver(EditProfileSchema),
    mode: 'onChange',
  });

  const { nationalityOptions } = useNationality();

  return (
    <FormContainer onSubmit={handleSubmit(onSubmit)} loading={loading} height="293px">
      <ControlledTextInput control={control} name="username" label="Username" />
      <ControlledTextInput control={control} name="email" label="Email Address" />
      <ControlledDateInput control={control} name="dateOfBirth" label="Date of Birth" />
      <ControlledSelectInput
        control={control}
        name="nationality"
        label="Nationality"
        options={nationalityOptions}
      />
    </FormContainer>
  );
}
