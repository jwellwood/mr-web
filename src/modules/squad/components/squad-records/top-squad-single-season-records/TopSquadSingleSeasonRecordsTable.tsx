import { CustomTable } from '../../../../../components/tables';
import { T_FETCH_SQUAD_SINGLE_SEASON_RECORDS_QUERY } from '../../../graphql';
import { columns, rows } from '../../tables/squad-top-single-season-records';

type StatsObj = NonNullable<T_FETCH_SQUAD_SINGLE_SEASON_RECORDS_QUERY['stats']>;
type StatArray = NonNullable<StatsObj[keyof StatsObj]>;

interface Props {
  stats?: StatArray | null;
  loading?: boolean;
}

export default function TopSquadSingleSeasonRecordsTable({ stats, loading }: Props) {
  return (
    <CustomTable
      columns={columns}
      rows={rows(stats)}
      isSortable={false}
      loading={loading}
      loadingRowCount={5}
    />
  );
}
