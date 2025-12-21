import CustomTable from '../../../../components/tables/CustomTable';
import { AllPlayerStreaks } from '../../../players/types';
import { ISquadSeasonStats } from '../../types';
import { columns, rows, styles } from './config';

type Props = {
  data?: { stats: ISquadSeasonStats[] };
  streaks?: { streaks: AllPlayerStreaks[] };
  loading: boolean;
};

export default function AllTimeStatsTable({ data, streaks, loading }: Props) {
  return (
    <CustomTable
      columns={columns}
      rows={rows(data, streaks, loading) || []}
      isSortable
      sortByString="apps"
      cellIndexStyles={styles}
    />
  );
}
