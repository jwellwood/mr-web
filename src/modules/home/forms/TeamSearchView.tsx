import { ApolloError } from '@apollo/client';
import { CustomButton } from '../../../components';
import PresentationModal from '../../../components/modals/PresentationModal';
import TeamList from '../components/TeamList';
import { FETCH_TEAMS_BY_SEARCH_QUERY } from '../types';
import SearchForm from './TeamSearchForm';

interface Props {
  searchTerm: string;
  isSearchComplete: boolean;
  onSubmit: (data: { teamName: string }) => void;
  loading: boolean;
  error?: ApolloError;
  data?: FETCH_TEAMS_BY_SEARCH_QUERY;
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
