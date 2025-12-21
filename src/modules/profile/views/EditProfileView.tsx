import { ApolloError } from '@apollo/client';

import { DataError } from '../../../components';
import { IEditProfileInput } from '../types';
import EditProfileForm from '../forms/EditProfileForm';
import { Spinner } from '../../../components/loaders';

interface Props {
  loading: boolean;
  onSubmit: (formData: IEditProfileInput) => void;
  defaultValues: IEditProfileInput | null;
  error?: ApolloError;
}

export default function EditProfileView({ loading, onSubmit, error, defaultValues }: Props) {
  if (error) {
    return <DataError error={error} />;
  }
  return defaultValues ? (
    <EditProfileForm onSubmit={onSubmit} defaultValues={defaultValues} loading={loading} />
  ) : (
    <Spinner />
  );
}
