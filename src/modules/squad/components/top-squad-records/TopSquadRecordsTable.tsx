import CustomTable from '../../../../components/tables/CustomTable';
import { TStatField } from '../../types';
import { columns, rows, styles } from './config';

interface Props {
  data?: TStatField[];
  loading?: boolean;
}
export default function TopSquadRecordsTable({ data, loading }: Props) {
  return (
    <CustomTable
      columns={columns}
      rows={rows(data, loading)}
      isSortable={false}
      sortByString="position"
      cellIndexStyles={styles}
    />
  );
}
