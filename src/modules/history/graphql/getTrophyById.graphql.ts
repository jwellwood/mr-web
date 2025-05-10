import { TypedDocumentNode, gql } from '@apollo/client';
import { ITrophyResponse } from '../../../types';
export const GET_TROPHY_BY_ID: TypedDocumentNode<{
  trophy: ITrophyResponse;
}> = gql`
  query GetTrophyById($trophyId: String!) {
    trophy: trophyById(trophyId: $trophyId) {
      _id
      name
      season
      opponent
      isFinal
      isWinner
      comment
    }
  }
`;
