import { ApolloError } from '@apollo/client';

import AddTeamForm from './AddTeamForm';
import { initialTeamDetailsState } from './state';
import type { TeamFormData } from './validation';

interface Props {
  loading: boolean;
  onSubmit: (formData: TeamFormData) => void;
  error?: ApolloError;
  countryOptions: { label: string; value: string }[];
}

export default function AddTeamView({ loading, onSubmit, error, countryOptions }: Props) {
  return (
    <AddTeamForm
      onSubmit={onSubmit}
      countryOptions={countryOptions}
      defaultValues={initialTeamDetailsState}
      loading={loading}
      error={error}
    />
  );
}
