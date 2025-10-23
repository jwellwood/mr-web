import { TypedDocumentNode, gql } from '@apollo/client';
import { ITeam } from '../types';

export const DELETE_TEAM: TypedDocumentNode<{
  team: ITeam;
}> = gql`
  mutation DELETE_TEAM($teamId: String!) {
    deleteTeam(teamId: $teamId) {
      _id
    }
  }
`;
