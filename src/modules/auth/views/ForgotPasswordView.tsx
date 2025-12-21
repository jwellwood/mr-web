import { ApolloError } from '@apollo/client';

import AuthLayout from '../components/AuthLayout';
import { IForgotPasswordInput } from '../types';
import { forgotPasswordFormState } from '../forms/state';
import { DataError } from '../../../components';
import ForgotPasswordForm from '../forms/ForgotPasswordForm';

type Props = {
  loading: boolean;
  onSubmit: (formData: IForgotPasswordInput) => void;
  error?: ApolloError;
};

export default function ForgotPasswordView({ loading, error, onSubmit }: Props) {
  return (
    <AuthLayout>
      <>
        {error ? (
          <DataError error={error} />
        ) : (
          <ForgotPasswordForm
            defaultValues={forgotPasswordFormState}
            onSubmit={onSubmit}
            loading={loading}
          />
        )}
      </>
    </AuthLayout>
  );
}
