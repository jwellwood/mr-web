import CustomTable from '../../../../components/tables/CustomTable';
import { ISquadListStats } from '../../types';
import { columns, rows, styles } from './config';

type Props = {
  data?: { players: ISquadListStats[] };
  loading: boolean;
};

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
