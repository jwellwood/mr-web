import { useTranslation } from 'react-i18next';
import { PageContainer } from '../../../components';
import { TApolloError } from '../../../types/apollo';
import AuthLayout from '../components/AuthLayout';
import TurnstileWidget from '../components/Turnstile';
import ForgotPasswordForm from '../forms/forgot-password/ForgotPasswordForm';
import { ForgotPasswordFormData, forgotPasswordFormState } from '../forms/forgot-password/schema';

interface Props {
  loading: boolean;
  onSubmit: (formData: ForgotPasswordFormData) => void;
  error?: TApolloError;
  setTurnstileToken: (token: string) => void;
}

export default function ForgotPasswordPage({ loading, error, onSubmit, setTurnstileToken }: Props) {
  const { t, i18n } = useTranslation('auth');
  return (
    <PageContainer title={t('PAGES.FORGOT_PASSWORD_PAGE')}>
      <AuthLayout helpText={t('FORM.HELP.FORGOT_PASSWORD')}>
        <>
          <ForgotPasswordForm
            key={i18n.language}
            defaultValues={forgotPasswordFormState}
            onSubmit={onSubmit}
            loading={loading}
            error={error}
          />
          <TurnstileWidget onVerify={setTurnstileToken} />
        </>
      </AuthLayout>
    </PageContainer>
  );
}
