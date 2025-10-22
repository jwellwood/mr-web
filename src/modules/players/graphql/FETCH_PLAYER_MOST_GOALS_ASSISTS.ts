import { TypedDocumentNode, gql } from '@apollo/client';
import { IMostGoalsAndAssistsByPlayer } from '../../../types';
export const FETCH_PLAYER_MOST_GOALS_ASSISTS: TypedDocumentNode<{
  stats: IMostGoalsAndAssistsByPlayer[];
}> = gql`
  query FetchPlayerMostGoalsAssists($teamId: String!, $playerId: String!) {
    stats: mostGoalsAndMostAssistsByPlayer(teamId: $teamId, playerId: $playerId) {
      maxGoals
      maxAssists
    }
  }
`;
