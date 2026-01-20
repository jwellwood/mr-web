import { useEffect, useState } from 'react';
import { useLazyQuery } from '@apollo/client';

import { FETCH_TEAMS_BY_SEARCH } from '../graphql';
import TeamSearchView from './TeamSearchView';

export default function TeamSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearchComplete, setIsSearchComplete] = useState(false);

  const [fetchTeamsBySearch, { loading, error, data }] = useLazyQuery(FETCH_TEAMS_BY_SEARCH, {
    variables: { filter: searchTerm },
  });

  useEffect(() => {
    setIsSearchComplete(false);
  }, [searchTerm]);

  const onSubmit = async (data: { teamName: string }) => {
    setSearchTerm(data.teamName);

    const fetchedTeams = await fetchTeamsBySearch({
      variables: { filter: data.teamName },
    });

    if (fetchedTeams.data?.teams) {
      setIsSearchComplete(true);
    }
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
