import AuthLayout from '../../components/AuthLayout';
import AuthorizationLinks from '../../components/AuthorizationLinks';
import { SIGN_UP_LINKS } from '../../constants';
import SignUpForm from '../../forms/sign-up/SignUpForm';
import ValidationEmailSent from '../../components/ValidationEmailSent';
import { signUpFormState } from './state';
import type { SignUpFormData } from './validation';
import { ApolloError } from '@apollo/client';

interface Props {
  loading: boolean;
  onSubmit: (formData: SignUpFormData) => void;
  email: string | null;
  error?: ApolloError;
}

export default function SignUpView({ loading, onSubmit, email, error }: Props) {
  return (
    <AuthLayout>
      <>
        <SignUpForm
          onSubmit={onSubmit}
          defaultValues={signUpFormState}
          loading={loading}
          error={error}
        />
        {email ? <ValidationEmailSent email={email} /> : null}
        <AuthorizationLinks links={SIGN_UP_LINKS} />
      </>
    </AuthLayout>
  );
}
