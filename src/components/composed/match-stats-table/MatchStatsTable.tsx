import CustomTable from '../../tables/CustomTable';
import { IMatchesStatsTable } from '../types';
import { columns, styles, rows } from './config';

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
