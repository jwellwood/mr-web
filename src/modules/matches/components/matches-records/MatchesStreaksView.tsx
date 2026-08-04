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
  if (data) {
    const { longestWinStreak, longestUnbeatenStreak, longestLossStreak, longestWinlessStreak } =
      data.streaks;
    const allEmpty = [
      longestWinStreak,
      longestUnbeatenStreak,
      longestLossStreak,
      longestWinlessStreak,
    ].every(s => !s.length);
    if (allEmpty) return <NoDataText>{t('NO_DATA.MATCHES')}</NoDataText>;
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
