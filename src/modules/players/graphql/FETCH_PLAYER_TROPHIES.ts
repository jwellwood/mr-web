import { TypedDocumentNode, gql } from '@apollo/client';
import { ITrophyResponse } from '../../history/types';

export const FETCH_PLAYER_TROPHIES: TypedDocumentNode<{
  trophies: ITrophyResponse[];
}> = gql`
  query FETCH_PLAYER_TROPHIES($seasonIds: [String!]!) {
    trophies: trophiesByPlayer(data: { seasonIds: $seasonIds }) {
      _id
      name
      year
      isWinner
      isFinal
    }
  }
`;
