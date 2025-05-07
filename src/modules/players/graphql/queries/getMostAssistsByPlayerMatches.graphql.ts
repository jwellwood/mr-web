import { TypedDocumentNode, gql } from '@apollo/client';
import { IMostGoalsByPlayerMatches } from 'types';

export const GET_MOST_ASSISTS_BY_PLAYER_MATCHES: TypedDocumentNode<{
  stats: IMostGoalsByPlayerMatches[];
}> = gql`
  query GetMostAssistsByPlayerMatches($teamId: String!, $playerId: String!) {
    stats: mostAssistsByPlayerInMatches(teamId: $teamId, playerId: $playerId) {
      teamGoals
      opponentGoals
      opponent
      date
      _id
      total
    }
  }
`;
