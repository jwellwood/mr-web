import { useLazyQuery } from '@apollo/client/react';
import { useState } from 'react';
import TeamSearchView from '../components/SearchView';
import { FETCH_TEAMS_BY_SEARCH } from '../graphql';

interface Props {
  buttonElement: React.ReactElement;
}

export default function TeamSearch({ buttonElement }: Props) {
  const [searchTerm, setSearchTerm] = useState('');
  const [fetchTeamsBySearch, { loading, error, data }] = useLazyQuery(FETCH_TEAMS_BY_SEARCH);

  const onSubmit = async (data: { teamName: string }) => {
    setSearchTerm(data.teamName);

    await fetchTeamsBySearch({
      variables: { filter: data.teamName },
    });
  };

  return (
    <TeamSearchView
      searchTerm={searchTerm}
      onSubmit={onSubmit}
      loading={loading}
      error={error}
      data={data}
      type="team"
      buttonElement={buttonElement}
    />
  );
}
