import { useState } from 'react';
import { ApolloError } from '@apollo/client';

import { CustomSwitch } from '../../../../components/inputs';
import { T_FETCH_MATCH_OPPONENTS } from '../../types';
import { DataError, NoDataText, SectionContainer } from '../../../../components';
import CustomTable from '../../../../components/tables/CustomTable';
import { columns, rows, styles } from './config';

interface Props {
  data?: T_FETCH_MATCH_OPPONENTS;
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
    return data?.stats?.filter(team => team.isActive);
  };

  const toggleSwitch = () => {
    setShowAllTeams(!showAllTeams);
  };

  const renderContent = () => {
    return seasonReady && data?.stats && data?.stats.length === 0 ? (
      <NoDataText>No matches yet</NoDataText>
    ) : (
      <CustomTable
        rows={rows(loading, filteredStats())}
        columns={columns}
        isSortable
        sortByString="played"
        cellIndexStyles={styles}
      />
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
          errors={[]}
        />
      }
    >
      {error ? <DataError error={error} /> : renderContent()}
    </SectionContainer>
  );
}
