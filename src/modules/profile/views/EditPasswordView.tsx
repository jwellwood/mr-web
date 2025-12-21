import { ApolloError } from '@apollo/client';

import { DataError } from '../../../components';
import { IChangePasswordInput } from '../types';
import EditPasswordForm from '../forms/EditPasswordForm';

interface Props {
  loading: boolean;
  onSubmit: (formData: IChangePasswordInput) => void;
  defaultValues: IChangePasswordInput;
  error?: ApolloError;
}

export default function EditPasswordView({ loading, onSubmit, error, defaultValues }: Props) {
  if (error) {
    return <DataError error={error} />;
  }
  return <EditPasswordForm onSubmit={onSubmit} defaultValues={defaultValues} loading={loading} />;
}
