import { gql } from '@apollo/client';

export const FETCH_PLAYER_OPPONENT_STATS = gql`
  query FETCH_PLAYER_OPPONENT_STATS($playerId: String!, $showAll: Boolean!) {
    stats: PLAYER_OPPONENT_STATS(playerId: $playerId, showAll: $showAll) {
      opponentId
      opponent
      opponentBadge
      matches
      wins
      draws
      losses
      goalsFor
      goalsAgainst
      goals
      assists
      conceded
    }
  }
`;
