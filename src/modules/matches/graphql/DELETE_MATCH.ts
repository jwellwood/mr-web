import { gql } from '@apollo/client';

export const DELETE_MATCH = gql`
  mutation DELETE_MATCH($teamId: String!, $matchId: String!) {
    deleteMatch(teamId: $teamId, matchId: $matchId) {
      _id
    }
  }
`;
