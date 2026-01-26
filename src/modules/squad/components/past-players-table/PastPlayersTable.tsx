import CustomTable from '../../../../components/tables/CustomTable';
import { columns, rows, styles } from './config';
import { FETCH_PAST_PLAYERS_QUERY } from '../../types';

interface Props {
  data?: FETCH_PAST_PLAYERS_QUERY;
  loading: boolean;
}

export default function PastPlayersTable({ data, loading }: Props) {
  return (
    <CustomTable
      columns={columns}
      rows={rows(data, loading)}
      isSortable
      sortByString="seasons"
      cellIndexStyles={styles}
    />
  );
}
