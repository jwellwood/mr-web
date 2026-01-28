import { gql } from '@apollo/client';

export const EDIT_AWARD = gql`
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
