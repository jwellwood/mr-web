import { useParams } from 'react-router-dom';

export const useCustomParams = () => {
  const { orgId, teamId, matchId, playerId, seasonId, trophyId, competitionId, awardId } = useParams<{
    orgId?: string;
    teamId?: string;
    matchId?: string;
    playerId?: string;
    seasonId?: string;
    trophyId?: string;
    competitionId?: string;
    awardId?: string;
  }>();

  return {
    orgId,
    teamId,
    matchId,
    playerId,
    seasonId,
    trophyId,
    competitionId,
    awardId
  };
};
