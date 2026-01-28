import { gql } from '@apollo/client';

export const FETCH_MATCHES_ALL_TIME_STATS = gql`
  query FETCH_MATCHES_ALL_TIME_STATS($teamId: String!) {
    stats: FETCH_MATCHES_ALL_TIME_STATS(teamId: $teamId) {
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
