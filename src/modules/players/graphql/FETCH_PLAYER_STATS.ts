import { TypedDocumentNode, gql } from '@apollo/client';
import { IPlayerStats } from '../types';

export const FETCH_PLAYER_STATS: TypedDocumentNode<{
  player: IPlayerStats;
}> = gql`
  query FETCH_PLAYER_STATS($playerId: String!, $seasonId: String!, $competitionId: String!) {
    player: PLAYER_STATS(playerId: $playerId, seasonId: $seasonId, competitionId: $competitionId) {
      _id
      minutes
      apps
      goals
      assists
      mvp
      conceded
      cleanSheet
      ownGoals
      pensMissed
      pensSaved
      pensScored
      yellowCards
      redCard
      wins
      draws
      defeats
      goalsFor
      goalsAgainst
      difference
      gamesWithGoal
      gamesWithAssist
      gamesWithGoalAndAssist
      gamesWithGoalOrAssist
    }
  }
`;
