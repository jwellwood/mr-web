import CustomTable from '../../../../components/tables/CustomTable';
import { IPlayerSeasonsSummary } from '../../types';
import { columns, rows, styles } from './config';

interface Props {
  data?: IPlayerSeasonsSummary[];
  loading?: boolean;
}

export default function PlayerSeasonSummaryTable({ data, loading }: Props) {
  return (
    <CustomTable columns={columns} rows={rows(data, loading)} cellIndexStyles={styles} isSortable />
  );
}
