import { ApolloError } from '@apollo/client';

import {
  DataError,
  LinksList,
  MatchStatsTable,
  NoDataText,
  SectionContainer,
} from '../../../components';
import { IMatchList, IMatchStats } from '../types.ts';
import { getMatchListData } from '../helpers/getMatchListData.tsx';
import { useCustomParams } from '../../../hooks/useCustomParams.tsx';

interface Props {
  data?: { matches: IMatchList[] };
  loading: boolean;
  error?: ApolloError;
}

export default function HeadToHeadView({ data, loading, error }: Props) {
  const { orgId, teamId, matchId } = useCustomParams();
  const mapMatchStats = () => {
    if (data?.matches) {
      const { matches } = data;
      const total = matches.length;
      const wins = matches.filter(match => match.teamGoals > match.opponentGoals).length;
      const draws = matches.filter(match => match.teamGoals === match.opponentGoals).length;
      const defeats = matches.filter(match => match.teamGoals < match.opponentGoals).length;
      const scored = matches.map(match => match.teamGoals).reduce((a, b) => a + b, 0);
      const conceded = matches.map(match => match.opponentGoals).reduce((a, b) => a + b, 0);
      const difference = scored - conceded;
      return {
        total,
        wins,
        draws,
        defeats,
        scored,
        conceded,
        difference,
      };
    }
  };

  const matchListData = getMatchListData({
    data: data?.matches || [],
    loading,
    orgId: orgId!,
    teamId: teamId!,
    showBadge: false,
    matchId,
  });

  const renderContent = () => {
    return data?.matches && data.matches.length === 0 ? (
      <NoDataText>No matches yet</NoDataText>
    ) : (
      <>
        <MatchStatsTable stats={mapMatchStats() as IMatchStats} loading={loading} />

        <LinksList links={matchListData} loading={loading} rows={15} />
      </>
    );
  };

  return (
    <SectionContainer>{error ? <DataError error={error} /> : renderContent()}</SectionContainer>
  );
}
