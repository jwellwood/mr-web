import AuthLayout from '../components/AuthLayout';
import AuthorizationLinks from '../components/AuthorizationLinks';
import { SIGN_UP_LINKS } from '../constants';
import { ISignUpInput } from '../types';
import SignUpForm from '../forms/SignUpForm';
import ValidationEmailSent from '../components/ValidationEmailSent';
import { signUpFormState } from '../forms/state';
import { DataError } from '../../../components';
import { ApolloError } from '@apollo/client';

type Props = {
  loading: boolean;
  onSubmit: (formData: ISignUpInput) => void;
  email: string | null;
  onAcceptTermsToggle: () => void;
  acceptTerms: boolean;
  error?: ApolloError;
};

export default function SignUpView({
  loading,
  onSubmit,
  email,
  onAcceptTermsToggle,
  acceptTerms,
  error,
}: Props) {
  return (
    <AuthLayout>
      <>
        {error ? (
          <DataError error={error} />
        ) : (
          <>
            <SignUpForm
              onSubmit={onSubmit}
              defaultValues={signUpFormState}
              onAcceptTermsToggle={onAcceptTermsToggle}
              acceptTerms={acceptTerms}
              loading={loading}
            />
            {email ? <ValidationEmailSent email={email} /> : null}
          </>
        )}
        <AuthorizationLinks links={SIGN_UP_LINKS} />
      </>
    </AuthLayout>
  );
}
