import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ApolloError } from '@apollo/client';

import { FormContainer, ControlledTextInput } from '../../../../components';
import type { ChangePasswordFormData } from './validation';
import { ChangePasswordSchema } from './validation';

interface Props {
  onSubmit: (data: ChangePasswordFormData) => void;
  defaultValues: ChangePasswordFormData;
  loading: boolean;
  error?: ApolloError;
}
export default function EditPasswordForm({ onSubmit, defaultValues, loading, error }: Props) {
  const { handleSubmit, control } = useForm<ChangePasswordFormData>({
    defaultValues,
    resolver: zodResolver(ChangePasswordSchema),
    mode: 'onChange',
  });

  return (
    <FormContainer onSubmit={handleSubmit(onSubmit)} loading={loading} error={error}>
      <ControlledTextInput
        control={control}
        name="password"
        label="Current Password"
        isPassword={true}
      />
      <ControlledTextInput
        control={control}
        name="newPassword"
        label="New Password"
        isPassword={true}
      />
      <ControlledTextInput
        control={control}
        name="confirmPassword"
        isPassword={true}
        label="Confirm New Password"
      />
    </FormContainer>
  );
}
