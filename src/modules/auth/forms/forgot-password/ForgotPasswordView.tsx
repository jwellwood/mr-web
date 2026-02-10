import { TApolloError } from '../../../../types/apollo';
import AuthLayout from '../../components/AuthLayout';
import ForgotPasswordForm from './ForgotPasswordForm';
import { forgotPasswordFormState } from './state';
import type { ForgotPasswordFormData } from './validation';

interface Props {
  loading: boolean;
  onSubmit: (formData: ForgotPasswordFormData) => void;
  error?: TApolloError;
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
