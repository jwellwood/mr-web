import React, { useMemo } from 'react';
import CustomTable from 'components/tables/CustomTable';
import { IMatchStats } from 'types';
import { match_table, match_table_styles } from '../configs';
import { getMatchStats } from '../helpers/getMatchStats';

interface Props {
  stats: IMatchStats;
  loading: boolean;
}
const MatchStatsTable: React.FC<Props> = ({ stats }) => {
  const rows = useMemo(() => getMatchStats(stats), [stats]);

  return (
    <CustomTable
      columns={match_table}
      rows={rows}
      isSortable={false}
      cellIndexStyles={match_table_styles}
    />
  );
};

export default MatchStatsTable;
