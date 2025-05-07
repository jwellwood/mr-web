import React, { useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { Spinner } from 'components/loaders';
import ErrorGraphql from 'errors/ErrorGraphql';
import { SearchForm } from '../components/SearchForm';
import { TeamList } from '../components/TeamList';
import { GET_TEAM_BY_SEARCH } from '../graphql/searchByTeam.graphql';

export const TeamSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearchComplete, setIsSearchComplete] = useState(false);

  const [getTeamBySearch, { loading, error, data }] = useLazyQuery(
    GET_TEAM_BY_SEARCH,
    {
      variables: { filter: searchTerm },
    }
  );

  const onSubmit = (data: any) => {
    setSearchTerm(data.teamName);
    getTeamBySearch().finally(() => {
      setIsSearchComplete(true);
    });
  };

  if (error) return <ErrorGraphql error={[error]} />;

  return (
    <>
      <SearchForm
        defaultValues={{ teamName: searchTerm }}
        onSubmit={onSubmit}
      />
      {!loading ? (
        <TeamList teams={data?.team} isSearchComplete={isSearchComplete} />
      ) : (
        <Spinner />
      )}
    </>
  );
};
