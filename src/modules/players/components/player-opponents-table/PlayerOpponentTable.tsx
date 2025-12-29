import CustomTable from '../../../../components/tables/CustomTable';
import { IPlayerVsStats } from '../../../matches/types';
import { columns, rows, styles } from './config';

type Props = {
  data?: IPlayerVsStats[];
  loading: boolean;
};

export default function PlayerOpponentTable({ data, loading }: Props) {
  return (
    <CustomTable
      columns={columns}
      rows={rows(data, loading)}
      cellIndexStyles={styles}
      isSortable
      sortByString="matches"
    />
  );
}
