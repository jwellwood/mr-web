import { TypedDocumentNode, gql } from '@apollo/client';
import { ITrophyResponse } from '../../history/types';

export const FETCH_PLAYER_TROPHIES: TypedDocumentNode<{
  trophies: ITrophyResponse[];
}> = gql`
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
