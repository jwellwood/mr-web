import { useMemo } from 'react';
import CustomTable from '../../../components/tables/CustomTable';
import { match_table, match_table_styles } from '../configs';
import { getMatchStats } from '../helpers/getMatchStats';
import { IMatchStats } from '../types';

interface Props {
  stats?: IMatchStats;
}
export default function MatchStatsTable({ stats }: Props) {
  const rows = useMemo(() => getMatchStats(stats), [stats]);

  return (
    <CustomTable
      columns={match_table}
      rows={rows}
      isSortable={false}
      cellIndexStyles={match_table_styles}
    />
  );
}
