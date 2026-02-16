import { CustomTable } from '../../tables';
import { IMatchesStatsTable } from '../types';
import { columns, rows } from './config';

interface Props {
  stats?: IMatchesStatsTable;
  loading: boolean;
}
export default function MatchStatsTable({ stats, loading }: Props) {
  return (
    <CustomTable
      columns={columns}
      rows={rows(stats)}
      isSortable={false}
      loading={loading}
      loadingRowCount={1}
    />
  );
}
