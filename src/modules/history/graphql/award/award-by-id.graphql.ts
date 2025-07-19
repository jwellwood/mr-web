import { TypedDocumentNode, gql } from '@apollo/client';
import { IAward } from '../../types';

export const AWARD_BY_ID: TypedDocumentNode<{
  award: IAward;
}> = gql`
  query AwardById(
    $awardId: String!
  ) {
    award: awardById(
      awardId: $awardId
    ) {
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
