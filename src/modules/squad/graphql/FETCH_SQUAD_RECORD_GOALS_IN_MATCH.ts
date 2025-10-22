import { TypedDocumentNode, gql } from '@apollo/client';
import { IMostGoalsInMatch } from '../../../types';

export const FETCH_SQUAD_RECORD_GOALS_IN_MATCH: TypedDocumentNode<{
  stats: IMostGoalsInMatch[];
}> = gql`
  query FETCH_SQUAD_RECORD_GOALS_IN_MATCH($teamId: String!) {
    stats: mostGoalsInGame(teamId: $teamId) {
      player
      total
      date
      opponentName
      opponentGoals
      teamGoals
      matchId
    }
  }
`;
