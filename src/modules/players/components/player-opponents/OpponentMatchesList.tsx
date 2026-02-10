import { DataError, MatchList, MatchStatsTable, NoDataText } from '../../../../components';
import { TApolloError } from '../../../../types/apollo';
import { T_FETCH_PLAYER_MATCHES_BY_OPPONENT } from '../../types';
import { mapMatchesToMatchStats } from './mapMatchesToMatchesStats';
import { mapMatchesToMatchList } from './mapMatchesToMatchList';

interface Props {
  data?: T_FETCH_PLAYER_MATCHES_BY_OPPONENT;
  loading: boolean;
  error?: TApolloError;
}

export default function OpponentMatchesList({ data, loading, error }: Props) {
  const renderContent = () => {
    if (data?.matches && data.matches.length === 0) {
      return <NoDataText>No matches found against this opponent.</NoDataText>;
    }

    return (
      <>
        <MatchStatsTable stats={mapMatchesToMatchStats(data?.matches || [])} loading={loading} />
        <MatchList
          matches={mapMatchesToMatchList(data?.matches || [])}
          loading={loading}
          showBadge={false}
          showComp={false}
        />
      </>
    );
  };

  return error ? <DataError error={error} /> : renderContent();
}
