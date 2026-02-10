import { DataError } from '../../../../components';
import NoDataText from '../../../../components/errors/error-text/ErrorText';
import CustomTable from '../../../../components/tables/CustomTable';
import { TApolloError } from '../../../../types/apollo';
import { T_FETCH_MATCHES_STREAK } from '../../types';
import { columns, rows, styles } from './config';

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
      rows={rows(data?.streaks, loading)}
      cellIndexStyles={styles}
      isSortable={false}
    />
  );
}
