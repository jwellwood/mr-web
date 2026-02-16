import { CustomTable } from '../../../../../components/tables';
import { FETCH_SQUAD_RECORDS_QUERY } from '../../../types';
import { columns, rows } from '../../tables/squad-top-records';

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
