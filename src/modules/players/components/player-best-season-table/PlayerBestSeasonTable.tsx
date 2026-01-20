import CustomTable from '../../../../components/tables/CustomTable';
import { IPlayerSeasonsSummary } from '../../types';
import { columns, rows } from './config';

interface Props {
  data?: IPlayerSeasonsSummary[];
  loading: boolean;
}

export default function PlayerBestSeasonTable({ data, loading }: Props) {
  return <CustomTable columns={columns} rows={rows(data, loading)} isSortable={false} />;
}
