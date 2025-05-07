import { TypedDocumentNode, gql } from '@apollo/client';
import { ITrophy } from 'types';

export const ADD_TROPHY: TypedDocumentNode<{
  trophy: ITrophy;
}> = gql`
  mutation AddTrophy(
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
