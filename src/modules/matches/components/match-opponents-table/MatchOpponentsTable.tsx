import CustomTable from '../../../../components/tables/CustomTable';
import { IOpponentTable } from '../../types';
import { columns, rows, styles } from './config';

interface Props {
  data?: IOpponentTable[];
  loading: boolean;
}

export default function MatchOpponentsTable({ data, loading }: Props) {
  return (
    <CustomTable
      rows={rows(loading, data)}
      columns={columns}
      isSortable
      sortByString="played"
      cellIndexStyles={styles}
    />
  );
}
