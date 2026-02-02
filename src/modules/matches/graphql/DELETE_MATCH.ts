import { gql } from '@apollo/client';

export const DELETE_MATCH = gql`
  mutation DELETE_MATCH($teamId: String!, $matchId: String!) {
    DELETE_MATCH(teamId: $teamId, matchId: $matchId) {
      _id
    }
  }
`;
