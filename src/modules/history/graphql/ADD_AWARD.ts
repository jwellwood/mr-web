import { gql } from '@apollo/client';

export const ADD_AWARD = gql`
  mutation ADD_AWARD(
    $teamId: String!
    $seasonId: String!
    $awardName: String!
    $winners: [String!]!
    $awardValue: Float
    $comment: String
  ) {
    ADD_AWARD(
      teamId: $teamId
      seasonId: $seasonId
      data: { winners: $winners, awardName: $awardName, awardValue: $awardValue, comment: $comment }
    ) {
      _id
    }
  }
`;
