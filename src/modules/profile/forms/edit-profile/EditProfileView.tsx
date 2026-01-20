import { ApolloError } from '@apollo/client';

import { MutationError } from '../../../../components';
import type { EditProfileFormData } from './validation';
import { Spinner } from '../../../../components/loaders';
import EditProfileForm from './EditProfileForm';

interface Props {
  loading: boolean;
  onSubmit: (formData: EditProfileFormData) => void;
  defaultValues: EditProfileFormData | null;
  error?: ApolloError;
}

export default function EditProfileView({ loading, onSubmit, error, defaultValues }: Props) {
  return defaultValues ? (
    <>
      <EditProfileForm onSubmit={onSubmit} defaultValues={defaultValues} loading={loading} />
      {error && <MutationError error={error} />}
    </>
  ) : (
    <Spinner />
  );
}
