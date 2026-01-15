import { TypedDocumentNode, gql } from '@apollo/client';
import { IAward } from '../types';

export const FETCH_AWARD: TypedDocumentNode<{
  award: IAward;
}> = gql`
  query FETCH_AWARD($awardId: String!) {
    award: FETCH_AWARD(awardId: $awardId) {
      _id
      awardName
      winners {
        name
        _id
      }
      awardValue
      comment
    }
  }
`;
