import { ApolloError } from '@apollo/client';

import { Spinner } from '../../../components/loaders';
import { IUser } from '../../auth/types';
import { DataError } from '../../../components';
import { deleteAccountFormState } from '../forms/state';
import DeleteAccountForm from '../forms/DeleteAccountForm';

interface Props {
  loading: boolean;
  data?: { user: IUser };
  onSubmit: () => Promise<void>;
  error?: ApolloError;
}

export default function DeleteProfileView({ loading, data, onSubmit, error }: Props) {
  const { user } = data || {};
  if (error) {
    return <DataError error={error} />;
  }
  return loading ? (
    <Spinner />
  ) : (
    <DeleteAccountForm
      onSubmit={onSubmit}
      defaultValues={deleteAccountFormState}
      username={user?.username || ''}
      loading={loading}
    />
  );
}
