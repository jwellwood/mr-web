import { ApolloError } from '@apollo/client';

import AuthLayout from '../components/AuthLayout';
import { IResetPasswordInput } from '../types';
import ResetPasswordForm from '../forms/ResetPasswordForm';
import { resetPasswordFormState } from '../forms/state';
import { DataError } from '../../../components';

type Props = {
  loading: boolean;
  onSubmit: (formData: IResetPasswordInput) => void;
  error?: ApolloError;
};

export default function ResetPasswordView({ loading, error, onSubmit }: Props) {
  return (
    <AuthLayout>
      <>
        {error ? (
          <DataError error={error} />
        ) : (
          <ResetPasswordForm
            defaultValues={resetPasswordFormState}
            onSubmit={onSubmit}
            loading={loading}
          />
        )}
      </>
    </AuthLayout>
  );
}
