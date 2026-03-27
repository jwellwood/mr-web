import AuthLayout from '../../components/AuthLayout';
import { FORM_HELP } from '../../i18n';
import ResetPasswordForm from './ResetPasswordForm';
import { resetPasswordFormState } from './state';
import type { ResetPasswordFormData } from './validation';

interface Props {
  loading: boolean;
  onSubmit: (formData: ResetPasswordFormData) => void;
}

export default function ResetPasswordView({ loading, onSubmit }: Props) {
  return (
    <AuthLayout helpText={FORM_HELP.RESET_PASSWORD}>
      <ResetPasswordForm
        defaultValues={resetPasswordFormState}
        onSubmit={onSubmit}
        loading={loading}
      />
    </AuthLayout>
  );
}
