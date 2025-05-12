import { TypedDocumentNode, gql } from '@apollo/client';
import { IMostGoalsAndAssistsByPlayer } from '../../../../types';
export const GET_MOST_GOALS_AND_MOST_ASSISTS_BY_PLAYER: TypedDocumentNode<{
  stats: IMostGoalsAndAssistsByPlayer[];
}> = gql`
  query GetMostGoalsAndAssistsByPlayer($teamId: String!, $playerId: String!) {
    stats: mostGoalsAndMostAssistsByPlayer(teamId: $teamId, playerId: $playerId) {
      maxGoals
      maxAssists
    }
  }
`;
