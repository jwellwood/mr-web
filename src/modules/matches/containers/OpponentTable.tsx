import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { CustomSwitch } from '../../../components/inputs';
import { Spinner } from '../../../components/loaders';
import CustomTable from '../../../components/tables/CustomTable';
import ErrorGraphql from '../../../errors/ErrorGraphql';
import { useCustomParams } from '../../../hooks/useCustomParams';
import { IOpponentTable } from '../../../types';
import { opponent_table, opponent_table_styles } from '../configs';
import { GET_OPPONENT_TABLE } from '../graphql/getOpponentTable.graphql';
import { mapOpponentStats } from '../helpers/mapOpponentStats';

const OpponentTable: React.FC = () => {
  const { teamId } = useCustomParams();
  const [showAllTeams, setShowAllTeams] = useState(false);

  const { data, loading, error } = useQuery(GET_OPPONENT_TABLE, {
    variables: { teamId },
  });

  const stats = data?.stats || ([] as IOpponentTable[]);
  const filteredStats = () => {
    if (showAllTeams) {
      return stats;
    }
    return (stats as IOpponentTable[]).filter(team => team.isActive);
  };
  const tableData = mapOpponentStats(filteredStats() as IOpponentTable[]);

  const toggleSwitch = () => {
    setShowAllTeams(!showAllTeams);
  };

  if (error) {
    return <ErrorGraphql error={error} />;
  }

  return !loading ? (
    <>
      <CustomSwitch
        checked={showAllTeams}
        onCheck={toggleSwitch}
        label={'Show all teams'}
        placement="start"
      />
      <CustomTable
        rows={tableData}
        columns={opponent_table}
        isSortable
        sortByString="played"
        cellIndexStyles={opponent_table_styles}
      />
    </>
  ) : (
    <Spinner />
  );
};

export default OpponentTable;
