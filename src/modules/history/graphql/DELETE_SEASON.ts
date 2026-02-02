import { gql } from '@apollo/client';

export const DELETE_SEASON = gql`
  mutation DELETE_SEASON($teamId: String!, $seasonId: String!) {
    season: DELETE_SEASON(teamId: $teamId, seasonId: $seasonId) {
      _id
    }
  }
`;
