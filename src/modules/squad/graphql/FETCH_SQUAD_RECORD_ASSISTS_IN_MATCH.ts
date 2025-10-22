import { TypedDocumentNode, gql } from '@apollo/client';
import { IMostGoalsInMatch } from '../../../types';

export const FETCH_SQUAD_RECORD_ASSISTS_IN_MATCH: TypedDocumentNode<{
  assistStats: IMostGoalsInMatch[];
}> = gql`
  query FETCH_SQUAD_RECORD_ASSISTS_IN_MATCH($teamId: String!) {
    assistStats: mostAssistsInGame(teamId: $teamId) {
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
