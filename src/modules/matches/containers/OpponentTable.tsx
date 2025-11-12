import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { FETCH_OPPONENTS } from '../graphql';

import { CustomSwitch } from '../../../components/inputs';
import { Spinner } from '../../../components/loaders';
import CustomTable from '../../../components/tables/CustomTable';
import ErrorGraphql from '../../../errors/ErrorGraphql';
import { useCustomParams } from '../../../hooks/useCustomParams';
import { opponent_table, opponent_table_styles } from '../configs';
import { mapOpponentStats } from '../helpers/mapOpponentStats';
import { IOpponentTable } from '../types';

export default function OpponentTable() {
  const { teamId } = useCustomParams();
  const [showAllTeams, setShowAllTeams] = useState(false);

  const { data, loading, error } = useQuery(FETCH_OPPONENTS, {
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

  const renderContent = () => {
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

  return error ? <ErrorGraphql error={error} /> : renderContent();
}
