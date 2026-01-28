import { gql } from '@apollo/client';

export const ADD_TROPHY = gql`
  mutation ADD_TROPHY(
    $teamId: String!
    $seasonId: String!
    $name: String!
    $year: String!
    $isWinner: Boolean!
    $isFinal: Boolean!
    $opponent: String
    $comment: String
  ) {
    trophy: addTrophy(
      teamId: $teamId
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
