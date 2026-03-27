import AuthLayout from '../../components/AuthLayout';
import AuthorizationLinks from '../../components/AuthorizationLinks';
import TurnstileWidget from '../../components/Turnstile';
import ValidationEmailSent from '../../components/ValidationEmailSent';
import { SIGN_UP_LINKS } from '../../constants';
import SignUpForm from '../../forms/sign-up/SignUpForm';
import { FORM_HELP } from '../../i18n';
import { signUpFormState } from './state';
import type { SignUpFormData } from './validation';

interface Props {
  loading: boolean;
  onSubmit: (formData: SignUpFormData) => void;
  email: string | null;
  onToken?: (token: string) => void;
}

export default function SignUpView({ loading, onSubmit, email, onToken }: Props) {
  return (
    <AuthLayout helpText={!email ? FORM_HELP.SIGN_UP : ''}>
      <>
        {email ? (
          <ValidationEmailSent email={email} />
        ) : (
          <SignUpForm onSubmit={onSubmit} defaultValues={signUpFormState} loading={loading} />
        )}
        {!email && <TurnstileWidget onVerify={onToken} />}
        <AuthorizationLinks links={SIGN_UP_LINKS} />
      </>
    </AuthLayout>
  );
}
