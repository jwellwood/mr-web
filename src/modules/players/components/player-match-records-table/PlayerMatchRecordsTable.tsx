import CustomTable from '../../../../components/tables/CustomTable';
import { IMostGoalsAndAssistsByPlayer } from '../../../matches/types';
import { columns, rows } from './config';

type Props = {
  data?: IMostGoalsAndAssistsByPlayer;
  loading: boolean;
};

export default function PlayerMatchRecordsTable({ data, loading }: Props) {
  return <CustomTable columns={columns} rows={rows(data, loading)} isSortable={false} />;
}
