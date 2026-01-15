import { useState } from 'react';
import { ApolloError } from '@apollo/client';

import { CustomSwitch } from '../../../components/inputs';
import { IOpponentTable } from '../types';
import { DataError, NoDataText, SectionContainer } from '../../../components';
import MatchOpponentsTable from '../components/match-opponents-table/MatchOpponentsTable';

interface Props {
  data?: { stats: IOpponentTable[] };
  loading: boolean;
  error?: ApolloError;
  seasonReady: boolean;
}

export default function MatchOpponentsView({ data, loading, error, seasonReady }: Props) {
  const [showAllTeams, setShowAllTeams] = useState(false);

  const filteredStats = () => {
    if (showAllTeams) {
      return data?.stats;
    }
    return (data?.stats as IOpponentTable[])?.filter(team => team.isActive);
  };

  const toggleSwitch = () => {
    setShowAllTeams(!showAllTeams);
  };

  const renderContent = () => {
    return seasonReady && data?.stats && data?.stats.length === 0 ? (
      <NoDataText>No matches yet</NoDataText>
    ) : (
      <MatchOpponentsTable data={filteredStats()} loading={loading} />
    );
  };

  return (
    <SectionContainer
      title={
        <CustomSwitch
          checked={showAllTeams}
          onCheck={toggleSwitch}
          label={'Show all teams'}
          placement="start"
        />
      }
    >
      {error ? <DataError error={error} /> : renderContent()}
    </SectionContainer>
  );
}
