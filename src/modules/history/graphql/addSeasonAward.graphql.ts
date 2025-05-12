import { TypedDocumentNode, gql } from '@apollo/client';
import { IAward } from '../types';

export const ADD_SEASON_AWARD: TypedDocumentNode<{
  award: IAward;
}> = gql`
  mutation AddSeasonAward(
    $teamId: String!
    $seasonId: String!
    $awardName: String!
    $winners: [String!]!
    $awardValue: Float
    $comment: String
  ) {
    addSeasonAward(
      teamId: $teamId
      seasonId: $seasonId
      data: { winners: $winners, awardName: $awardName, awardValue: $awardValue, comment: $comment }
    ) {
      _id
    }
  }
`;
