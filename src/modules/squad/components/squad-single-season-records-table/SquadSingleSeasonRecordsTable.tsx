import CustomTable from '../../../../components/tables/CustomTable';
import { ISquadSingleSeasonRecords } from '../../types';
import { columns, rows, styles } from './config';

interface Props {
  data?: { stats: ISquadSingleSeasonRecords };
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
