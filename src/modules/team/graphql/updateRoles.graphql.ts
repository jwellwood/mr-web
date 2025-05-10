import { TypedDocumentNode, gql } from '@apollo/client';
import {ITeam} from "../../../types";

export const UPDATE_ROLES: TypedDocumentNode<{
  team: ITeam;
}> = gql`
  mutation UpdateRoles(
    $teamId: String!
    $name: String!
    $role: String!
    $contact: String
  ) {
    role: updateTeamRoles(
      teamId: $teamId
      data: { name: $name, role: $role, contact: $contact }
    ) {
      teamRoles {
        name
        role
        contact
      }
    }
  }
`;

export const DELETE_ROLE: TypedDocumentNode<{
  team: ITeam;
}> = gql`
  mutation DeleteTeamRole($teamId: String!, $roleId: String!) {
    role: deleteTeamRole(teamId: $teamId, roleId: $roleId) {
      _id
    }
  }
`;
