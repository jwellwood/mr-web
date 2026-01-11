import CustomTable from '../../tables/CustomTable';
import { IMatchStats } from '../../../modules/matches/types';
import { columns, styles, rows } from './config';

interface Props {
  stats?: IMatchStats;
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
