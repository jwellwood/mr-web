import { TypedDocumentNode, gql } from '@apollo/client';
import { ITrophy } from '../../../types';
export const EDIT_TROPHY: TypedDocumentNode<{
  trophy: ITrophy;
}> = gql`
  mutation EditTrophy(
    $teamId: String!
    $trophyId: String!
    $seasonId: String!
    $name: String!
    $isWinner: Boolean!
    $isFinal: Boolean!
    $opponent: String
    $comment: String
  ) {
    trophy: editTrophy(
      teamId: $teamId
      trophyId: $trophyId
      data: {
        name: $name
        seasonId: $seasonId
        isFinal: $isFinal
        isWinner: $isWinner
        opponent: $opponent
        comment: $comment
      }
    ) {
      _id
    }
  }
`;
