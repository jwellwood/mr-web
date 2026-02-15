import { DataError } from '../../../../components';
import NoDataText from '../../../../components/errors/error-text/ErrorText';
import CustomTable from '../../../../components/tables/custom-table/CustomTable';
import { TApolloError } from '../../../../types/apollo';
import { columns, rows } from '../../tables/match-streaks';
import { T_FETCH_MATCHES_STREAK } from '../../types';

interface Props {
  data?: T_FETCH_MATCHES_STREAK;
  loading: boolean;
  error?: TApolloError;
}

export default function MatchesStreaksView({ data, loading, error }: Props) {
  if (data && data.streaks.longestLossStreak.length === 0) {
    return <NoDataText>No matches yet</NoDataText>;
  }

  return error ? (
    <DataError error={error} />
  ) : (
    <CustomTable
      columns={columns}
      rows={rows(data?.streaks)}
      isSortable={false}
      loading={loading}
      loadingRowCount={4}
    />
  );
}
