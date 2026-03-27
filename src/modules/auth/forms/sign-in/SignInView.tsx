import AuthLayout from '../../components/AuthLayout';
import AuthorizationLinks from '../../components/AuthorizationLinks';
import { SIGN_IN_LINKS } from '../../constants';
import ResendVerification from '../../containers/ResendVerification';
import SignInForm from './SignInForm';
import { signInFormState } from './state';
import type { SignInFormData } from './validation';

interface Props {
  loading: boolean;
  onSubmit: (formData: SignInFormData) => void;
  showResendLink: boolean;
  email: string | null;
}

export default function SignInView({ loading, onSubmit, showResendLink, email }: Props) {
  return (
    <AuthLayout>
      <>
        <SignInForm defaultValues={signInFormState} onSubmit={onSubmit} loading={loading} />

        {showResendLink && <ResendVerification email={email} />}
        <AuthorizationLinks links={SIGN_IN_LINKS} />
      </>
    </AuthLayout>
  );
}
