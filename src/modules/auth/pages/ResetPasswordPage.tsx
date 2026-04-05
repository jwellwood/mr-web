import { useTranslation } from 'react-i18next';
import { PageContainer } from '../../../components';
import AuthLayout from '../components/AuthLayout';
import ResetPasswordForm from '../forms/reset-password/ResetPasswordForm';
import { ResetPasswordFormData, resetPasswordFormState } from '../forms/reset-password/schema';

interface Props {
  loading: boolean;
  onSubmit: (formData: ResetPasswordFormData) => void;
}

export default function ResetPasswordPage({ loading, onSubmit }: Props) {
  const { t, i18n } = useTranslation('auth');
  return (
    <PageContainer title={t('PAGES.RESET_PASSWORD_PAGE')}>
      <AuthLayout helpText={t('FORM.HELP.RESET_PASSWORD')}>
        <ResetPasswordForm
          key={i18n.language}
          defaultValues={resetPasswordFormState}
          onSubmit={onSubmit}
          loading={loading}
        />
      </AuthLayout>
    </PageContainer>
  );
}
