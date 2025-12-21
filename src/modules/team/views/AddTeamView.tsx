import { ApolloError } from '@apollo/client';

import { DataError } from '../../../components';
import AddTeamForm from '../forms/components/AddTeamForm';
import { initialTeamDetailsState } from '../forms/state';
import { ITeamDetailsInput } from '../types';

interface Props {
  loading: boolean;
  onSubmit: (formData: Partial<ITeamDetailsInput>) => void;
  error?: ApolloError;
  countryOptions: { label: string; value: string }[];
}

export default function AddTeamView({ loading, onSubmit, error, countryOptions }: Props) {
  if (error) {
    return <DataError error={error} />;
  }
  return (
    <AddTeamForm
      onSubmit={onSubmit}
      countryOptions={countryOptions}
      defaultValues={initialTeamDetailsState}
      loading={loading}
    />
  );
}
