import { TypedDocumentNode, gql } from '@apollo/client';
import { IPlayerVsStats } from '../../../../types';
export const GET_PLAYER_VS_STATS: TypedDocumentNode<{
  stats: IPlayerVsStats[];
}> = gql`
  query GetMostGoalsAndAssistsByPlayer($playerId: String!) {
    stats: playerVsStats(playerId: $playerId) {
      opponentId
      opponent
      opponentBadge
      matches
      goals
      assists
      conceded
    }
  }
`;
