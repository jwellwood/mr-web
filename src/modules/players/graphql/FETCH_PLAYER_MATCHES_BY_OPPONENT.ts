import { gql } from '@apollo/client';

export const FETCH_PLAYER_MATCHES_BY_OPPONENT = gql`
  query FETCH_PLAYER_MATCHES_BY_OPPONENT($playerId: String!, $opponentId: String!) {
    matches: PLAYER_MATCHES_BY_OPPONENT(playerId: $playerId, opponentId: $opponentId) {
      teamGoals
      opponentGoals
      opponent
      date
      isHome
      _id
    }
  }
`;
