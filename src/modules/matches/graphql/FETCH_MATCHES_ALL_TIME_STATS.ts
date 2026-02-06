import { gql } from '@apollo/client';

export const FETCH_MATCHES_ALL_TIME_STATS = gql`
  query FETCH_MATCHES_ALL_TIME_STATS(
    $teamId: String!
    $competitionId: String!
    $includeForfeits: Boolean!
  ) {
    stats: MATCHES_ALL_TIME_STATS(
      teamId: $teamId
      competitionId: $competitionId
      includeForfeits: $includeForfeits
    ) {
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
