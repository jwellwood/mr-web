import { ApolloError } from '@apollo/client';

import type { ChangePasswordFormData } from './validation';
import EditPasswordForm from './EditPasswordForm';

interface Props {
  loading: boolean;
  onSubmit: (formData: ChangePasswordFormData) => void;
  defaultValues: ChangePasswordFormData;
  error?: ApolloError;
}

export default function EditPasswordView({ loading, onSubmit, error, defaultValues }: Props) {
  return (
    <EditPasswordForm
      onSubmit={onSubmit}
      defaultValues={defaultValues}
      loading={loading}
      error={error}
    />
  );
}
