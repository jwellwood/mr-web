import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { FormContainer, ControlledTextInput } from '../../../../components';
import { CenteredGrid } from '../../../../components/grids';
import { ResetPasswordSchema, type ResetPasswordFormData } from './validation';
import { ApolloError } from '@apollo/client';

interface Props {
  onSubmit: (data: ResetPasswordFormData) => void;
  defaultValues: ResetPasswordFormData;
  loading: boolean;
  error?: ApolloError;
}

export default function ResetPasswordForm({ onSubmit, defaultValues, loading, error }: Props) {
  const { handleSubmit, control } = useForm<ResetPasswordFormData>({
    defaultValues,
    resolver: zodResolver(ResetPasswordSchema),
    mode: 'onChange',
  });

  return (
    <FormContainer onSubmit={handleSubmit(onSubmit)} loading={loading} error={error}>
      <CenteredGrid dir="row">
        <ControlledTextInput
          control={control}
          name="password"
          label="New Password"
          isPassword={true}
        />
        <ControlledTextInput
          control={control}
          name="confirmPassword"
          isPassword={true}
          label="Confirm New Password"
        />
      </CenteredGrid>
    </FormContainer>
  );
}
