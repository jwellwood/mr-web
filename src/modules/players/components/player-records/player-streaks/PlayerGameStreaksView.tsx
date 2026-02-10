import { DataError, NoDataText, SectionContainer } from '../../../../../components';
import CustomTable from '../../../../../components/tables/CustomTable';
import { TApolloError } from '../../../../../types/apollo';
import { T_FETCH_PLAYER_STREAKS } from '../../../types';
import { columns, rows, styles } from './config';

interface Props {
  data?: T_FETCH_PLAYER_STREAKS;
  loading: boolean;
  error?: TApolloError;
}

export default function PlayerGameStreaksView({ data, loading, error }: Props) {
  const renderContent = () => {
    if (data?.streaks && !data.streaks.playedStreak.length) {
      return <NoDataText>No matches played yet</NoDataText>;
    }
    return (
      <CustomTable
        columns={columns}
        rows={rows(data?.streaks, loading)}
        isSortable={false}
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
