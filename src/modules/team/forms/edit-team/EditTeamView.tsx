import { ApolloError } from '@apollo/client';

import EditTeamForm from './EditTeamForm';
import { Spinner } from '../../../../components/loaders';
import type { EditTeamFormData } from './types';

interface Props {
  loading: boolean;
  onSubmit: (formData: EditTeamFormData) => void;
  defaultValues: EditTeamFormData | null;
  error?: ApolloError;
  countryOptions: { label: string; value: string }[];
}

export default function EditTeamView({
  loading,
  onSubmit,
  defaultValues,
  error,
  countryOptions,
}: Props) {
  return defaultValues ? (
    <EditTeamForm
      defaultValues={defaultValues}
      onSubmit={onSubmit}
      countryOptions={countryOptions}
      loading={loading}
      error={error}
    />
  ) : (
    <Spinner />
  );
}
