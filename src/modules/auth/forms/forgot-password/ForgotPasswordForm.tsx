import { ApolloError } from '@apollo/client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { FormContainer, ControlledTextInput } from '../../../../components';
import { ForgotPasswordSchema, type ForgotPasswordFormData } from './validation';

interface Props {
  defaultValues: ForgotPasswordFormData;
  onSubmit: (data: ForgotPasswordFormData) => void;
  loading: boolean;
  error?: ApolloError;
}

export default function ForgotPasswordForm({ defaultValues, onSubmit, loading, error }: Props) {
  const { control, handleSubmit } = useForm<ForgotPasswordFormData>({
    defaultValues,
    resolver: zodResolver(ForgotPasswordSchema),
    mode: 'onChange',
  });

  return (
    <FormContainer onSubmit={handleSubmit(onSubmit)} loading={loading} error={error}>
      <ControlledTextInput control={control} name="email" label="Email Address" />
    </FormContainer>
  );
}
