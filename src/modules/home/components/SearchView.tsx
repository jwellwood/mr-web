import { useTranslation } from 'react-i18next';
import { PresentationModal } from '../../../components/modals';
import { TApolloError } from '../../../types/apollo';
import SearchForm from '../forms/SearchForm';
import { T_FETCH_ORGS_BY_SEARCH, T_FETCH_TEAMS_BY_SEARCH } from '../graphql';
import { mapSearchResultToEntity } from '../helpers/mapResultToEntity';
import EntityList from './EntityList';

interface Props {
  searchTerm: string;
  onSubmit: (data: { teamName: string }) => void;
  loading: boolean;
  error?: TApolloError;
  data?: T_FETCH_TEAMS_BY_SEARCH | T_FETCH_ORGS_BY_SEARCH;
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
  const { t, i18n } = useTranslation('home');
  return (
    <PresentationModal
      title={type === 'org' ? t('SEARCH.MODAL.TITLE.ORG') : t('SEARCH.MODAL.TITLE.TEAM')}
      buttonElement={buttonElement}
    >
      <SearchForm
        key={i18n.language}
        defaultValues={{ teamName: searchTerm }}
        onSubmit={onSubmit}
        loading={loading}
        error={error}
        type={type}
      />
      {type === 'team' ? (
        <EntityList
          entity={mapSearchResultToEntity('team', (data as T_FETCH_TEAMS_BY_SEARCH)?.teams)}
          searchTerm={searchTerm}
          loading={loading}
          type="team"
        />
      ) : (
        <EntityList
          entity={mapSearchResultToEntity('org', (data as T_FETCH_ORGS_BY_SEARCH)?.orgs)}
          searchTerm={searchTerm}
          loading={loading}
          type="org"
        />
      )}
    </PresentationModal>
  );
}
