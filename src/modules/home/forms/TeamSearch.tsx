import { useLazyQuery } from '@apollo/client/react';
import { useMemo, useState } from 'react';
import { FETCH_TEAMS_BY_SEARCH } from '../graphql';
import TeamSearchView from './TeamSearchView';

export default function TeamSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [fetchTeamsBySearch, { loading, error, data }] = useLazyQuery(FETCH_TEAMS_BY_SEARCH);
  const isSearchComplete = useMemo(
    () => Boolean(data?.teams?.length && searchTerm.length > 0),
    [data?.teams, searchTerm]
  );

  const onSubmit = async (data: { teamName: string }) => {
    setSearchTerm(data.teamName);

    await fetchTeamsBySearch({
      variables: { filter: data.teamName },
    });
  };

  return (
    <TeamSearchView
      searchTerm={searchTerm}
      isSearchComplete={isSearchComplete}
      onSubmit={onSubmit}
      loading={loading}
      error={error}
      data={data}
    />
  );
}
