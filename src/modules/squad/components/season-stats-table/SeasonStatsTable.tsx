import CustomTable from '../../../../components/tables/CustomTable';
import { ISquadSeasonStats } from '../../types';
import { columns, rows, styles } from './config';

type Props = {
  data?: { stats: ISquadSeasonStats[] };
  loading: boolean;
};

export default function SeasonStatsTable({ data, loading }: Props) {
  return (
    <CustomTable
      columns={columns}
      rows={rows(data, loading) || []}
      isSortable
      sortByString="apps"
      cellIndexStyles={styles}
    />
  );
}
