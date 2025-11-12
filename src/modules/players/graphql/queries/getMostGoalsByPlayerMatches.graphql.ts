import { TypedDocumentNode, gql } from '@apollo/client';
import { IMostGoalsByPlayerMatches } from '../../../matches/types';

export const GET_MOST_GOALS_BY_PLAYER_MATCHES: TypedDocumentNode<{
  stats: IMostGoalsByPlayerMatches[];
}> = gql`
  query GetMostGoalsByPlayerMatches($teamId: String!, $playerId: String!) {
    stats: mostGoalsByPlayerInMatches(teamId: $teamId, playerId: $playerId) {
      teamGoals
      opponentGoals
      opponent
      date
      _id
      total
    }
  }
`;
