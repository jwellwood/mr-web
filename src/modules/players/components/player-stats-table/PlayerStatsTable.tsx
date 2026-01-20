import CustomTable from '../../../../components/tables/CustomTable';
import { IPlayerStats } from '../../types';
import { columns, rows, styles } from './config';

interface Props {
  stats?: IPlayerStats;
  loading: boolean;
}

export default function PlayerStreaksTable({ stats, loading }: Props) {
  return (
    <CustomTable
      columns={columns}
      rows={rows(stats, loading)}
      isSortable={false}
      cellIndexStyles={styles}
    />
  );
}
