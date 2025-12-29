import CustomTable from '../../../../components/tables/CustomTable';
import { IPlayerStats } from '../../types';
import { columns, rows, styles } from './config';

type Props = {
  data?: IPlayerStats;
  loading: boolean;
};

export default function GamesWithStatTable({ data, loading }: Props) {
  return (
    <CustomTable
      columns={columns}
      rows={rows(data, loading)}
      isSortable={false}
      cellIndexStyles={styles}
    />
  );
}
