import { useTranslation } from 'react-i18next';
import { PageContainer } from '../../../components';
import { CustomAlert } from '../../../components/alerts';
import AuthLayout from '../components/AuthLayout';
import AuthorizationLinks from '../components/AuthorizationLinks';
import TurnstileWidget from '../components/Turnstile';
import { SIGN_UP_LINKS } from '../constants';
import { SignUpFormData, signUpFormState } from '../forms/sign-up/schema';
import SignUpForm from '../forms/sign-up/SignUpForm';

interface Props {
  loading: boolean;
  onSubmit: (formData: SignUpFormData) => void;
  email: string | null;
  onToken?: (token: string) => void;
}

export default function SignUpPage({ loading, onSubmit, email, onToken }: Props) {
  const { t, i18n } = useTranslation('auth');
  return (
    <PageContainer title={t('PAGES.SIGN_UP_PAGE')}>
      <AuthLayout helpText={!email ? t('FORM.HELP.SIGN_UP') : ''}>
        <>
          {email ? (
            <CustomAlert type="info" text={t('EMAIL_VALIDATION.SENT', { email })} />
          ) : (
            <SignUpForm
              key={i18n.language}
              onSubmit={onSubmit}
              defaultValues={signUpFormState}
              loading={loading}
            />
          )}
          {!email && <TurnstileWidget onVerify={onToken} />}
          <AuthorizationLinks links={SIGN_UP_LINKS} />
        </>
      </AuthLayout>
    </PageContainer>
  );
}
