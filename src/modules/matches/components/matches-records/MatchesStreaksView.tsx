import { useTranslation } from 'react-i18next';
import { DataError, NoDataText } from '../../../../components';
import CustomTable from '../../../../components/tables/custom-table/CustomTable';
import { TApolloError } from '../../../../types/apollo';
import { T_FETCH_MATCHES_STREAK } from '../../graphql';
import { columns, rows } from '../tables/match-streaks';

interface Props {
  data?: T_FETCH_MATCHES_STREAK;
  loading: boolean;
  error?: TApolloError;
}

export default function MatchesStreaksView({ data, loading, error }: Props) {
  const { t } = useTranslation('matches');
  if (data && data.streaks.longestLossStreak.length === 0) {
    return <NoDataText>{t('MESSAGES.NO_MATCHES')}</NoDataText>;
  }

  return error ? (
    <DataError error={error} />
  ) : (
    <CustomTable
      columns={columns(t)}
      rows={rows(t, data?.streaks)}
      isSortable={false}
      loading={loading}
      loadingRowCount={4}
    />
  );
}
