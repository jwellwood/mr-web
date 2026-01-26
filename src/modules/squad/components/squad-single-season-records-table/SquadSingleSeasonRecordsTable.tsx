import CustomTable from '../../../../components/tables/CustomTable';
import { FETCH_SQUAD_SINGLE_SEASON_RECORDS_QUERY } from '../../types';
import { columns, rows, styles } from './config';

interface Props {
  data?: FETCH_SQUAD_SINGLE_SEASON_RECORDS_QUERY;
  loading: boolean;
}

export default function SquadSingleSeasonRecordsTable({ data, loading }: Props) {
  return (
    <CustomTable
      columns={columns}
      rows={rows(data, loading)}
      isSortable={false}
      cellIndexStyles={styles}
    />
  );
}
