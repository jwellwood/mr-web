import { useParams } from 'react-router-dom';

export const useCustomParams = () => {
  const {
    awardId,
    competitionId,
    gameWeek,
    matchId,
    orgId,
    orgSeasonId,
    playerId,
    resultId,
    seasonId,
    teamId,
    trophyId,
  } = useParams<{
    awardId?: string;
    competitionId?: string;
    gameWeek?: string;
    matchId?: string;
    orgId?: string;
    orgSeasonId?: string;
    playerId?: string;
    resultId?: string;
    seasonId?: string;
    teamId?: string;
    trophyId?: string;
  }>();

  return {
    awardId,
    competitionId,
    gameWeek,
    matchId,
    orgId,
    orgSeasonId,
    playerId,
    resultId,
    seasonId,
    teamId,
    trophyId,
  };
};
