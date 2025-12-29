import { ApolloError } from '@apollo/client';

import { DataError, NoDataText, SectionContainer } from '../../../components';
import { IMostGoalsAndAssistsByPlayer } from '../../matches/types';
import PlayerMatchRecordsTable from '../components/player-match-records-table/PlayerMatchRecordsTable';

type Props = {
  data?: { stats: IMostGoalsAndAssistsByPlayer };
  loading: boolean;
  error?: ApolloError;
};

export default function PlayerMatchesWithRecordsView({ data, loading, error }: Props) {
  const renderContent = () => {
    if (data && !data?.stats) {
      return <NoDataText>No matches with goals yet</NoDataText>;
    }
    return <PlayerMatchRecordsTable data={data?.stats} loading={loading} />;
  };

  return (
    <SectionContainer title="Records">
      {error ? <DataError error={error} /> : renderContent()}
    </SectionContainer>
  );
}
