import { TypedDocumentNode, gql } from '@apollo/client';
import { IAward } from '../../types';

export const AWARD_EDIT: TypedDocumentNode<{
  award: IAward;
}> = gql`
  mutation EditAward(
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
