import { ApolloError } from '@apollo/client';

import PresentationModal from '../../../components/modals/PresentationModal';
import { CustomButton } from '../../../components';
import { ITeamResponse } from '../../team/types';
import SearchForm from './TeamSearchForm';
import TeamList from '../components/TeamList';

interface Props {
  searchTerm: string;
  isSearchComplete: boolean;
  onSubmit: (data: { teamName: string }) => void;
  loading: boolean;
  error?: ApolloError;
  data?: { teams: ITeamResponse[] };
}

export default function TeamSearchView({
  searchTerm,
  isSearchComplete,
  onSubmit,
  loading,
  error,
  data,
}: Props) {
  return (
    <PresentationModal
      title="Find your team"
      buttonElement={<CustomButton>Find your team</CustomButton>}
    >
      <SearchForm
        defaultValues={{ teamName: searchTerm }}
        onSubmit={onSubmit}
        loading={loading}
        error={error}
      />
      <TeamList teams={data?.teams} isSearchComplete={isSearchComplete} loading={loading} />
    </PresentationModal>
  );
}
