import { ApolloError } from '@apollo/client';

import AuthLayout from '../components/AuthLayout';
import { Spinner } from '../../../components/loaders';
import ResendVerification from '../containers/ResendVerification';
import AuthorizationLinks from '../components/AuthorizationLinks';
import { SIGN_IN_LINKS } from '../constants';
import { ISignInInput } from '../types';
import { DataError } from '../../../components';
import { signInFormState } from '../forms/state';
import SignInForm from '../forms/SignInForm';

type Props = {
  loading: boolean;
  error?: ApolloError;
  onSubmit: (formData: ISignInInput) => void;
  showResendLink: boolean;
  email: string | null;
};

export default function SignInView({ loading, error, onSubmit, showResendLink, email }: Props) {
  return (
    <AuthLayout>
      <>
        {error ? (
          <DataError error={error} />
        ) : (
          <>
            {!loading ? (
              <SignInForm defaultValues={signInFormState} onSubmit={onSubmit} />
            ) : (
              <Spinner />
            )}
            {showResendLink && <ResendVerification email={email} />}
          </>
        )}
        <AuthorizationLinks links={SIGN_IN_LINKS} />
      </>
    </AuthLayout>
  );
}
