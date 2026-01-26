import { gql } from '@apollo/client';

export const FETCH_PLAYER_TROPHIES = gql`
  query FETCH_PLAYER_TROPHIES($playerId: String!) {
    trophies: PLAYER_TROPHIES(playerId: $playerId) {
      _id
      name
      year
      isWinner
      isFinal
    }
  }
`;
