import { ApolloError } from '@apollo/client';

import { DataError, NoDataText, SectionContainer } from '../../../../../components';
import CustomTable from '../../../../../components/tables/CustomTable';
import { columns, rows, styles } from './config';
import { T_FETCH_SQUAD_STREAKS_QUERY } from '../../../types';

interface Props {
  data?: T_FETCH_SQUAD_STREAKS_QUERY;
  loading: boolean;
  error?: ApolloError;
}

export default function SquadStreakRecordsView({ data, loading, error }: Props) {
  const renderContent = () => {
    return data && !data.streaks.played.value ? (
      <NoDataText>No records yet</NoDataText>
    ) : (
      <CustomTable
        columns={columns}
        rows={rows(data?.streaks, loading)}
        isSortable
        sortByString="played"
        cellIndexStyles={styles}
      />
    );
  };

  return (
    <SectionContainer title="Streaks">
      {error ? <DataError error={error} /> : renderContent()}
    </SectionContainer>
  );
}
