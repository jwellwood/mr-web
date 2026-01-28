import { gql } from '@apollo/client';

export const DELETE_TEAM = gql`
  mutation DELETE_TEAM($teamId: String!) {
    DELETE_TEAM(teamId: $teamId) {
      _id
    }
  }
`;
