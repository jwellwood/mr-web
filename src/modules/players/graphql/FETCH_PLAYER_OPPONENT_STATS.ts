import { gql } from '@apollo/client';

export const FETCH_PLAYER_OPPONENT_STATS = gql`
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
