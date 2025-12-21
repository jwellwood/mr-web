import { ApolloError } from '@apollo/client';

import { DataError } from '../../../components';
import { ITeamDetailsInput } from '../types';
import DeleteTeamForm from '../forms/components/DeleteTeamForm';

interface Props {
  data?: { team: { teamName: string } };
  loading: boolean;
  onDelete: (formData: Partial<ITeamDetailsInput>) => void;
  error?: ApolloError;
}

export default function DeleteTeamView({ loading, onDelete, error, data }: Props) {
  const { team } = data || {};
  if (error) {
    return <DataError error={error} />;
  }
  return (
    <DeleteTeamForm
      onSubmit={onDelete}
      defaultValues={undefined}
      teamName={team?.teamName || ''}
      loading={loading}
    />
  );
}
