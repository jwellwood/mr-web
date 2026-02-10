import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { FormContainer, ControlledTextInput } from '../../../../components';
import { TApolloError } from '../../../../types/apollo';
import { ForgotPasswordSchema, type ForgotPasswordFormData } from './validation';

interface Props {
  defaultValues: ForgotPasswordFormData;
  onSubmit: (data: ForgotPasswordFormData) => void;
  loading: boolean;
  error?: TApolloError;
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
