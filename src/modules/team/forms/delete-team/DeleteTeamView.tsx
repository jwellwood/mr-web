import { ApolloError } from '@apollo/client';

import { DataError } from '../../../../components';
import type { DeleteTeamFormData } from './validation';
import DeleteTeamForm from './DeleteTeamForm';

interface Props {
  data?: { team: { teamName: string } };
  loading: boolean;
  onDelete: (formData: DeleteTeamFormData) => Promise<void> | void;
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
