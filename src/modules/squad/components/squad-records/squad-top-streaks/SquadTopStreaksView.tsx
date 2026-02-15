import { DataError, NoDataText } from '../../../../../components';
import { CustomTable } from '../../../../../components/tables';
import { TApolloError } from '../../../../../types/apollo';
import { columns, rows } from '../../../tables/squad-top-streaks';
import { T_FETCH_TOP_PLAYER_STREAKS_QUERY } from '../../../types';

interface Props {
  data?: T_FETCH_TOP_PLAYER_STREAKS_QUERY;
  streakType: string;
  loading: boolean;
  error?: TApolloError;
}

export default function SquadTopStreaksView({ data, loading, error, streakType }: Props) {
  const renderContent = () => (
    <>
      {data && !data.streaks ? (
        <NoDataText>No records yet</NoDataText>
      ) : (
        <CustomTable
          columns={columns}
          rows={rows(streakType, data?.streaks)}
          isSortable={false}
          loading={loading}
          loadingRowCount={10}
        />
      )}
    </>
  );

  return error ? <DataError error={error} /> : renderContent();
}
