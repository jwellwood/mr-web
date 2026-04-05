import { useLazyQuery } from '@apollo/client/react';
import { useState } from 'react';
import TeamSearchView from '../components/SearchView';
import { FETCH_ORGS_BY_SEARCH } from '../graphql';

interface Props {
  buttonElement: React.ReactElement;
}

export default function OrgSearch({ buttonElement }: Props) {
  const [fetchOrgsBySearch, { loading, error, data }] = useLazyQuery(FETCH_ORGS_BY_SEARCH);

  const [searchTerm, setSearchTerm] = useState('');
  const onSubmit = async (data: { teamName: string }) => {
    setSearchTerm(data.teamName);

    await fetchOrgsBySearch({
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
      type="org"
      buttonElement={buttonElement}
    />
  );
}
