import { TApolloError } from '../../../../types/apollo';
import AuthLayout from '../../components/AuthLayout';
import ResetPasswordForm from './ResetPasswordForm';
import { resetPasswordFormState } from './state';
import type { ResetPasswordFormData } from './validation';

interface Props {
  loading: boolean;
  onSubmit: (formData: ResetPasswordFormData) => void;
  error?: TApolloError;
}

export default function ResetPasswordView({ loading, onSubmit, error }: Props) {
  return (
    <AuthLayout>
      <ResetPasswordForm
        defaultValues={resetPasswordFormState}
        onSubmit={onSubmit}
        loading={loading}
        error={error}
      />
    </AuthLayout>
  );
}
