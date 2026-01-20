import CustomTable from '../../../../components/tables/CustomTable';
import { StreakTypes } from '../../types';
import { columns, rows, styles } from './config';

interface Props {
  data?: { streaks: StreakTypes };
  loading: boolean;
}

export default function PlayerStreaksTable({ data, loading }: Props) {
  return (
    <CustomTable
      columns={columns}
      rows={rows(data?.streaks, loading)}
      isSortable={false}
      cellIndexStyles={styles}
    />
  );
}
