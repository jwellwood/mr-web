import { gql } from '@apollo/client';

export const FETCH_MATCHES_STATS = gql`
  query FETCH_MATCHES_STATS($teamId: String!, $seasonId: String!) {
    stats: FETCH_MATCHES_STATS(teamId: $teamId, seasonId: $seasonId) {
      total
      wins
      draws
      defeats
      scored
      conceded
      teamAvg
      oppAvg
      difference
    }
  }
`;
