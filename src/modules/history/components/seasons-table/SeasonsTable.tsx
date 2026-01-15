import CustomTable from '../../../../components/tables/CustomTable';
import { ILeaguePositions } from '../../types';
import { columns, rows, styles } from './config';

interface Props {
  data?: ILeaguePositions[];
  loading: boolean;
}

export default function SeasonsTable({ data, loading }: Props) {
  return (
    <CustomTable
      columns={columns}
      rows={rows(data, loading)}
      isSortable={false}
      cellIndexStyles={styles}
    />
  );
}
