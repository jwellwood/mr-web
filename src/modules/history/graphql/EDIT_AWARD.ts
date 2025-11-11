import { TypedDocumentNode, gql } from '@apollo/client';
import { IAward } from '../types';

export const EDIT_AWARD: TypedDocumentNode<{
  award: IAward;
}> = gql`
  mutation EDIT_AWARD(
    $awardId: String!
    $teamId: String!
    $awardName: String!
    $winners: [String!]!
    $awardValue: Float
    $comment: String
  ) {
    editAward(
      awardId: $awardId
      teamId: $teamId
      data: { winners: $winners, awardName: $awardName, awardValue: $awardValue, comment: $comment }
    ) {
      _id
    }
  }
`;
