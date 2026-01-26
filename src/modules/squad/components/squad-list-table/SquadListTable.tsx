import CustomTable from '../../../../components/tables/CustomTable';
import { columns, rows, styles } from './config';
import { FETCH_SQUAD_LIST_BY_SEASON_QUERY } from '../../types';

interface Props {
  data?: FETCH_SQUAD_LIST_BY_SEASON_QUERY;
  loading: boolean;
}

export default function SquadListTable({ data, loading }: Props) {
  return (
    <CustomTable
      columns={columns}
      rows={rows(data, loading) || []}
      isSortable
      sortByString="position"
      cellIndexStyles={styles}
    />
  );
}
