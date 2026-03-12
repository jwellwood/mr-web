import { TApolloError } from '../../../../types/apollo';
import AuthLayout from '../../components/AuthLayout';
import { FORM_HELP } from '../../i18n';
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
    <AuthLayout helpText={FORM_HELP.RESET_PASSWORD}>
      <ResetPasswordForm
        defaultValues={resetPasswordFormState}
        onSubmit={onSubmit}
        loading={loading}
        error={error}
      />
    </AuthLayout>
  );
}
