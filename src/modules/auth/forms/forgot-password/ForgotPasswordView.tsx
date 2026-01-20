import { ApolloError } from '@apollo/client';

import AuthLayout from '../../components/AuthLayout';
import { forgotPasswordFormState } from './state';
import ForgotPasswordForm from './ForgotPasswordForm';
import type { ForgotPasswordFormData } from './validation';

interface Props {
  loading: boolean;
  onSubmit: (formData: ForgotPasswordFormData) => void;
  error?: ApolloError;
}

export default function ForgotPasswordView({ loading, error, onSubmit }: Props) {
  return (
    <AuthLayout>
      <ForgotPasswordForm
        defaultValues={forgotPasswordFormState}
        onSubmit={onSubmit}
        loading={loading}
        error={error}
      />
    </AuthLayout>
  );
}
