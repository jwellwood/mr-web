import { TypedDocumentNode, gql } from '@apollo/client';
import { ITrophy } from '../types';

export const DELETE_TROPHY: TypedDocumentNode<{
  trophy: ITrophy;
}> = gql`
  mutation DELETE_TROPHY($teamId: String!, $trophyId: String!) {
    trophy: deleteTrophy(teamId: $teamId, trophyId: $trophyId) {
      _id
    }
  }
`;
