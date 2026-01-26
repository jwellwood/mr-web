import { ApolloError } from '@apollo/client';

import { MutationError } from '../../../../components';
import { deleteAccountFormState } from './state';
import DeleteAccountForm from './DeleteAccountForm';
import { FETCH_USER_QUERY } from '../../types';

interface Props {
  loading: boolean;
  data?: FETCH_USER_QUERY;
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
