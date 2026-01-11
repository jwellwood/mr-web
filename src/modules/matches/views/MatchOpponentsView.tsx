import { useState } from 'react';
import { ApolloError } from '@apollo/client';

import { CustomSwitch } from '../../../components/inputs';
import { IOpponentTable } from '../types';
import { DataError, NoDataText } from '../../../components';
import MatchOpponentsTable from '../components/match-opponents-table/MatchOpponentsTable';

interface Props {
  data?: { stats: IOpponentTable[] };
  loading: boolean;
  error?: ApolloError;
  seasonReady: boolean;
}

export default function MatchOpponentsView({ data, loading, error, seasonReady }: Props) {
  const [showAllTeams, setShowAllTeams] = useState(false);

  const stats = data?.stats || ([] as IOpponentTable[]);
  const filteredStats = () => {
    if (showAllTeams) {
      return stats;
    }
    return (stats as IOpponentTable[]).filter(team => team.isActive);
  };

  const toggleSwitch = () => {
    setShowAllTeams(!showAllTeams);
  };

  const renderContent = () => {
    return (seasonReady && !data) || (data?.stats && data?.stats.length === 0) ? (
      <NoDataText>No matches yet</NoDataText>
    ) : (
      <>
        <CustomSwitch
          checked={showAllTeams}
          onCheck={toggleSwitch}
          label={'Show all teams'}
          placement="start"
        />

        <MatchOpponentsTable data={filteredStats()} loading={loading} />
      </>
    );
  };

  return error ? <DataError error={error} /> : renderContent();
}
