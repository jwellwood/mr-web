import CustomTable from '../../../tables/CustomTable';
import { columns, styles, rows } from './config';
import { IMatchesStatsTable } from '../types';

interface Props {
  stats?: IMatchesStatsTable;
  loading: boolean;
}
export default function MatchStatsTable({ stats, loading }: Props) {
  return (
    <CustomTable
      columns={columns}
      rows={rows(stats, loading)}
      isSortable={false}
      cellIndexStyles={styles}
    />
  );
}
