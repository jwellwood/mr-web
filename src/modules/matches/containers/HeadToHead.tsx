import React from 'react';
import { useQuery } from '@apollo/client';
import { SectionContainer } from '../../../components/containers';
import LinksList from '../../../components/lists/LinksList';
import { Spinner } from '../../../components/loaders';
import ErrorGraphql from '../../../errors/ErrorGraphql';
import { useCustomParams } from '../../../hooks/useCustomParams';
import { IMatchStats } from '../../../types';
import MatchStatsTable from '../components/MatchStatsTable';
import { GET_MATCHES_BY_OPPONENT } from '../graphql/getMatchesByOpponent.graphql';
import { getMatchListData } from '../helpers/getMatchListData.tsx';

type Props = {
  opponentId?: string;
};

const HeadToHead: React.FC<Props> = ({ opponentId }) => {
  const { orgId, teamId, matchId } = useCustomParams();
  const { data, loading, error } = useQuery(GET_MATCHES_BY_OPPONENT, {
    variables: { teamId, opponentId },
  });

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

  if (error) return <ErrorGraphql error={error} />;

  const matchListData = getMatchListData({
    data: data?.matches || [],
    loading,
    orgId: orgId!,
    teamId: teamId!,
    showBadge: false,
    matchId,
  });
  return (
    <SectionContainer>
      {!loading ? (
        <SectionContainer>
          <MatchStatsTable stats={mapMatchStats() as IMatchStats} />
          {getMatchListData && getMatchListData.length > 0 && <LinksList links={matchListData} />}
        </SectionContainer>
      ) : (
        <Spinner />
      )}
    </SectionContainer>
  );
};

export default HeadToHead;
