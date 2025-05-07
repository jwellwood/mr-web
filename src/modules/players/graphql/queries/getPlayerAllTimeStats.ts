import { TypedDocumentNode, gql } from '@apollo/client';
import { IPlayerStats } from 'types';

export const GET_PLAYER_ALL_TIME_STATS: TypedDocumentNode<{
  player: IPlayerStats;
}> = gql`
  query GetPlayerAllTimeStats($playerId: String!) {
    player: playerAllTimeStats(playerId: $playerId) {
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
