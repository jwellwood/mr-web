import { TypedDocumentNode, gql } from '@apollo/client';
import { IMostGoalsAndAssistsByPlayer } from '../../matches/types';

export const FETCH_PLAYER_MOST_GOALS_ASSISTS: TypedDocumentNode<{
  stats: IMostGoalsAndAssistsByPlayer;
}> = gql`
  query FETCH_PLAYER_MOST_GOALS_ASSISTS($teamId: String!, $playerId: String!) {
    stats: PLAYER_MOST_GOALS_ASSISTS(teamId: $teamId, playerId: $playerId) {
      maxGoals
      maxAssists
    }
  }
`;
