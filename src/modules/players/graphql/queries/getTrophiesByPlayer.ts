import { TypedDocumentNode, gql } from '@apollo/client';
import { ITrophyResponse } from 'types';

export const GET_TROPHIES_BY_PLAYER: TypedDocumentNode<{
  trophies: ITrophyResponse[];
}> = gql`
  query GetTrophiesByPlayer($seasonIds: [String!]!) {
    trophies: trophiesByPlayer(data: { seasonIds: $seasonIds }) {
      _id
      name
      year
      isWinner
      isFinal
    }
  }
`;
