import CustomTable from '../../../../components/tables/CustomTable';
import { columns, rows, styles } from './config';

type DataType = object & {
  [key: string]: {
    value: number;
    names: {
      name: string;
      id: string;
    }[];
  }[];
};

type Props<T extends DataType> = {
  stat: string;
  data?: T;
  loading: boolean;
};
export default function SquadRecordTable<T extends DataType>({ data, stat, loading }: Props<T>) {
  return (
    <CustomTable
      columns={columns}
      rows={rows(data?.[stat], loading) || []}
      isSortable={false}
      sortByString="position"
      cellIndexStyles={styles}
    />
  );
}
