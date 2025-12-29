import { TypedDocumentNode, gql } from '@apollo/client';
import { IPlayerVsStats } from '../../matches/types';

export const FETCH_PLAYER_OPPONENT_STATS: TypedDocumentNode<{
  stats: IPlayerVsStats[];
}> = gql`
  query FETCH_PLAYER_OPPONENT_STATS($playerId: String!) {
    stats: PLAYER_OPPONENT_STATS(playerId: $playerId) {
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
