import { useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { SearchForm } from '../components/SearchForm';
import { TeamList } from '../components/TeamList';
import { GET_TEAM_BY_SEARCH } from '../graphql/searchByTeam.graphql';
import ErrorGraphql from '../../../errors/ErrorGraphql.tsx';
import PresentationModal from '../../../components/modals/PresentationModal.tsx';
import CustomButton from '../../../components/buttons/CustomButton.tsx';
import SectionContainer from '../../../components/containers/SectionContainer.tsx';
import LoadingList from '../../../components/lists/LoadingList.tsx';

export const TeamSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearchComplete, setIsSearchComplete] = useState(false);

  const [getTeamBySearch, { loading, error, data }] = useLazyQuery(GET_TEAM_BY_SEARCH, {
    variables: { filter: searchTerm },
  });

  const onSubmit = async (data: { teamName: string }) => {
    setSearchTerm(data.teamName);

    const team = await getTeamBySearch({
      variables: { filter: data.teamName },
    });

    if (team.data?.team) {
      setIsSearchComplete(true);
    }
  };

  if (error) return <ErrorGraphql error={error} />;

  const children = () => {
    if (error) return <ErrorGraphql error={error} />;

    return !loading ? (
      <TeamList teams={data?.team || []} isSearchComplete={isSearchComplete} />
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
          {children()}
        </SectionContainer>
      </PresentationModal>
    </>
  );
};
