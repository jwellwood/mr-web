import { useTranslation } from 'react-i18next';
import { PageContainer } from '../../../components';
import AuthLayout from '../components/AuthLayout';
import AuthorizationLinks from '../components/AuthorizationLinks';
import { SIGN_IN_LINKS } from '../constants';
import ResendVerification from '../containers/ResendVerification';
import { SignInFormData, signInFormState } from '../forms/sign-in/schema';
import SignInForm from '../forms/sign-in/SignInForm';

interface Props {
  loading: boolean;
  onSubmit: (formData: SignInFormData) => void;
  showResendLink: boolean;
  email: string | null;
}

export default function SignInPage({ loading, onSubmit, showResendLink, email }: Props) {
  const { t, i18n } = useTranslation('auth');

  return (
    <PageContainer title={t('PAGES.SIGN_IN_PAGE')}>
      <AuthLayout>
        <>
          <SignInForm
            key={i18n.language}
            defaultValues={signInFormState}
            onSubmit={onSubmit}
            loading={loading}
          />

          {showResendLink && <ResendVerification email={email} />}
          <AuthorizationLinks links={SIGN_IN_LINKS} />
        </>
      </AuthLayout>
    </PageContainer>
  );
}
