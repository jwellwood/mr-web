import CustomTable from '../../../../../components/tables/CustomTable';
import { FETCH_SQUAD_RECORDS_QUERY } from '../../../types';
import { columns, rows, styles } from './config';

type StatsObj = NonNullable<FETCH_SQUAD_RECORDS_QUERY['stats']>;
type StatArray = NonNullable<StatsObj[keyof StatsObj]>;

interface Props {
  stats?: StatArray | null;
  loading?: boolean;
}
export default function TopSquadRecordsTable({ stats, loading }: Props) {
  return (
    <CustomTable
      columns={columns}
      rows={rows(stats, loading)}
      isSortable={false}
      sortByString="position"
      cellIndexStyles={styles}
    />
  );
}
