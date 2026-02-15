import CustomTable from '../../../../../components/tables/custom-table/CustomTable';
import { columns, rows } from '../../../tables/squad-top-records';
import { FETCH_SQUAD_RECORDS_QUERY } from '../../../types';

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
      rows={rows(stats)}
      isSortable={false}
      sortByString="position"
      loading={loading}
      loadingRowCount={5}
    />
  );
}
