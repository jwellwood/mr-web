import { gql } from '@apollo/client';

export const EDIT_TROPHY = gql`
  mutation EDIT_TROPHY(
    $teamId: String!
    $trophyId: String!
    $seasonId: String!
    $name: String!
    $year: String!
    $isWinner: Boolean!
    $isFinal: Boolean!
    $opponent: String
    $comment: String
  ) {
    trophy: EDIT_TROPHY(
      teamId: $teamId
      trophyId: $trophyId
      data: {
        name: $name
        seasonId: $seasonId
        isFinal: $isFinal
        year: $year
        isWinner: $isWinner
        opponent: $opponent
        comment: $comment
      }
    ) {
      _id
    }
  }
`;
