import { TypedDocumentNode, gql } from '@apollo/client';
import { IMostGoalsByPlayerMatches } from '../../matches/types';

export const FETCH_PLAYER_MATCHES_WITH_RECORD_GOALS: TypedDocumentNode<{
  stats: IMostGoalsByPlayerMatches[];
}> = gql`
  query FETCH_PLAYER_MATCHES_WITH_RECORD_GOALS($teamId: String!, $playerId: String!) {
    stats: PLAYER_MATCHES_WITH_RECORD_GOALS(teamId: $teamId, playerId: $playerId) {
      teamGoals
      opponentGoals
      opponent
      date
      _id
      total
    }
  }
`;
