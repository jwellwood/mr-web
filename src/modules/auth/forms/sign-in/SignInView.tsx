import { ApolloError } from '@apollo/client';

import AuthLayout from '../../components/AuthLayout';
import ResendVerification from '../../containers/ResendVerification';
import AuthorizationLinks from '../../components/AuthorizationLinks';
import { SIGN_IN_LINKS } from '../../constants';

import { signInFormState } from './state';
import type { SignInFormData } from './validation';
import SignInForm from './SignInForm';

interface Props {
  loading: boolean;
  onSubmit: (formData: SignInFormData) => void;
  showResendLink: boolean;
  email: string | null;
  error?: ApolloError;
}

export default function SignInView({ loading, onSubmit, showResendLink, email, error }: Props) {
  return (
    <AuthLayout>
      <>
        <SignInForm
          defaultValues={signInFormState}
          onSubmit={onSubmit}
          loading={loading}
          error={error}
        />

        {showResendLink && <ResendVerification email={email} />}
        <AuthorizationLinks links={SIGN_IN_LINKS} />
      </>
    </AuthLayout>
  );
}
