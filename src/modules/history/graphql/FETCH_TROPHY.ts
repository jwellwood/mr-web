import { TypedDocumentNode, gql } from '@apollo/client';
import { ITrophyResponse } from '../types';

export const FETCH_TROPHY: TypedDocumentNode<{
  trophy: ITrophyResponse;
}> = gql`
  query FETCH_TROPHY($trophyId: String!) {
    trophy: FETCH_TROPHY(trophyId: $trophyId) {
      _id
      name
      season
      opponent
      year
      isFinal
      isWinner
      comment
    }
  }
`;
