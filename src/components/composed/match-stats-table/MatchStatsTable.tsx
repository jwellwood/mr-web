import { useTranslation } from 'react-i18next';
import { CustomTable } from '../../tables';
import { IMatchesStatsTable } from '../types';
import { columns, rows } from './config';

interface Props {
  stats?: IMatchesStatsTable;
  loading: boolean;
}
export default function MatchStatsTable({ stats, loading }: Props) {
  const { t } = useTranslation('components');
  return (
    <CustomTable
      columns={columns(t)}
      rows={rows(stats)}
      isSortable={false}
      loading={loading}
      loadingRowCount={1}
    />
  );
}
