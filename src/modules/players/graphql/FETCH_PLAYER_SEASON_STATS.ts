import { TypedDocumentNode, gql } from '@apollo/client';
import { IPlayerStats } from '../types';

export const FETCH_PLAYER_SEASON_STATS: TypedDocumentNode<{
  player: IPlayerStats[];
}> = gql`
  query FETCH_PLAYER_SEASON_STATS($seasonId: String!, $playerId: String!) {
    player: playerSeasonStats(seasonId: $seasonId, playerId: $playerId) {
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
