import { gql } from '@apollo/client';

export const DELETE_SEASON = gql`
  mutation DELETE_SEASON($teamId: String!, $seasonId: String!) {
    season: deleteSeason(teamId: $teamId, seasonId: $seasonId) {
      _id
    }
  }
`;
