import { gql } from '@apollo/client';

export const DELETE_TEAM = gql`
  mutation DELETE_TEAM($teamId: String!) {
    deleteTeam(teamId: $teamId) {
      _id
    }
  }
`;
