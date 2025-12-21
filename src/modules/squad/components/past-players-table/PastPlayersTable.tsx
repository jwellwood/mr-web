import CustomTable from '../../../../components/tables/CustomTable';
import { IPastPlayer } from '../../types';
import { columns, rows, styles } from './config';

interface Props {
  data?: { players: IPastPlayer[] };
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
