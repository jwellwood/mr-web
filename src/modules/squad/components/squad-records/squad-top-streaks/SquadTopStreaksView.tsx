import { ApolloError } from '@apollo/client';

import { DataError, NoDataText } from '../../../../../components';
import CustomTable from '../../../../../components/tables/CustomTable';
import { T_FETCH_TOP_PLAYER_STREAKS_QUERY } from '../../../types';
import { columns, rows, styles } from './config';

interface Props {
  data?: T_FETCH_TOP_PLAYER_STREAKS_QUERY;
  streakType: string;
  loading: boolean;
  error?: ApolloError;
}

export default function SquadTopStreaksView({ data, loading, error, streakType }: Props) {
  const renderContent = () => (
    <>
      {data && !data.streaks ? (
        <NoDataText>No records yet</NoDataText>
      ) : (
        <CustomTable
          columns={columns}
          rows={rows(data?.streaks ?? [], streakType, loading)}
          isSortable={false}
          cellIndexStyles={styles}
        />
      )}
    </>
  );

  return error ? <DataError error={error} /> : renderContent();
}
