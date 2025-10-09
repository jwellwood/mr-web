import { useState } from 'react';
import { useLazyQuery } from '@apollo/client';

import { FETCH_TEAMS_BY_SEARCH } from '../graphql';

import SearchForm from '../components/SearchForm';
import TeamList from '../components/TeamList';
import ErrorGraphql from '../../../errors/ErrorGraphql.tsx';
import PresentationModal from '../../../components/modals/PresentationModal.tsx';
import CustomButton from '../../../components/buttons/CustomButton.tsx';
import SectionContainer from '../../../components/containers/SectionContainer.tsx';
import LoadingList from '../../../components/lists/LoadingList.tsx';

export default function TeamSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearchComplete, setIsSearchComplete] = useState(false);

  const [fetchTeamsBySearch, { loading, error, data }] = useLazyQuery(FETCH_TEAMS_BY_SEARCH, {
    variables: { filter: searchTerm },
  });

  const onSubmit = async (data: { teamName: string }) => {
    setSearchTerm(data.teamName);

    const fetchedTeams = await fetchTeamsBySearch({
      variables: { filter: data.teamName },
    });

    if (fetchedTeams.data?.teams) {
      setIsSearchComplete(true);
    }
  };

  const renderContent = () => {
    if (error) return <ErrorGraphql error={error} />;

    return !loading ? (
      <TeamList teams={data?.teams || []} isSearchComplete={isSearchComplete} />
    ) : (
      <LoadingList avatar label secondary />
    );
  };

  return (
    <>
      <PresentationModal
        title="Find your team"
        buttonElement={<CustomButton>Find your team</CustomButton>}
      >
        <SectionContainer>
          <SearchForm defaultValues={{ teamName: searchTerm }} onSubmit={onSubmit} />
          {renderContent()}
        </SectionContainer>
      </PresentationModal>
    </>
  );
}
