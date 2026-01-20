import { ApolloError } from '@apollo/client';

import { IUser } from '../../../auth/types';
import { MutationError } from '../../../../components';
import { deleteAccountFormState } from './state';
import DeleteAccountForm from './DeleteAccountForm';

interface Props {
  loading: boolean;
  data?: { user: IUser };
  onSubmit: () => Promise<void>;
  error?: ApolloError;
}

export default function DeleteProfileView({ loading, data, onSubmit, error }: Props) {
  const { user } = data || {};

  return (
    <>
      <DeleteAccountForm
        onSubmit={onSubmit}
        defaultValues={deleteAccountFormState}
        username={user?.username || ''}
        loading={loading}
      />
      {error && <MutationError error={error} />}
    </>
  );
}
