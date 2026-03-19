import { gql } from '@apollo/client';

export const DELETE_TEAM = gql`
  mutation DELETE_TEAM($teamId: String!, $orgId: String!) {
    DELETE_TEAM(teamId: $teamId, orgId: $orgId) {
      _id
    }
  }
`;
