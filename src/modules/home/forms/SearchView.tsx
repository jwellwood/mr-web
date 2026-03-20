import { PresentationModal } from '../../../components/modals';
import { TApolloError } from '../../../types/apollo';
import EntityList from '../components/EntityList';
import { mapSearchResultToEntity } from '../helpers/mapResultToEntity';
import { FETCH_ORGS_BY_SEARCH_QUERY, FETCH_TEAMS_BY_SEARCH_QUERY } from '../types';
import SearchForm from './SearchForm';

interface Props {
  searchTerm: string;
  onSubmit: (data: { teamName: string }) => void;
  loading: boolean;
  error?: TApolloError;
  data?: FETCH_TEAMS_BY_SEARCH_QUERY | FETCH_ORGS_BY_SEARCH_QUERY;
  type?: 'team' | 'org';
  buttonElement: React.ReactElement;
}

export default function SearchView({
  searchTerm,
  onSubmit,
  loading,
  error,
  data,
  type,
  buttonElement,
}: Props) {
  return (
    <PresentationModal
      title={type === 'org' ? 'Find your league' : 'Find your team'}
      buttonElement={buttonElement}
    >
      <SearchForm
        defaultValues={{ teamName: searchTerm }}
        onSubmit={onSubmit}
        loading={loading}
        error={error}
        type={type}
      />
      {type === 'team' ? (
        <EntityList
          entity={mapSearchResultToEntity('team', (data as FETCH_TEAMS_BY_SEARCH_QUERY)?.teams)}
          searchTerm={searchTerm}
          loading={loading}
          type="team"
        />
      ) : (
        <EntityList
          entity={mapSearchResultToEntity('org', (data as FETCH_ORGS_BY_SEARCH_QUERY)?.orgs)}
          searchTerm={searchTerm}
          loading={loading}
          type="org"
        />
      )}
    </PresentationModal>
  );
}
