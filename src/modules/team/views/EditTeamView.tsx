import { ApolloError } from '@apollo/client';

import { DataError } from '../../../components';
import { ITeamDetailsInput } from '../types';
import EditTeamForm from '../forms/components/EditTeamForm';
import { Spinner } from '../../../components/loaders';

interface Props {
  loading: boolean;
  onSubmit: (formData: Partial<ITeamDetailsInput>) => void;
  defaultValues: Partial<ITeamDetailsInput> | null;
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
  if (error) {
    return <DataError error={error} />;
  }
  return defaultValues ? (
    <EditTeamForm
      defaultValues={defaultValues}
      onSubmit={onSubmit}
      countryOptions={countryOptions}
      loading={loading}
    />
  ) : (
    <Spinner />
  );
}
