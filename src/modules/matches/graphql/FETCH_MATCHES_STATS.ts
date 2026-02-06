import { gql } from '@apollo/client';

export const FETCH_MATCHES_STATS = gql`
  query FETCH_MATCHES_STATS(
    $teamId: String!
    $seasonId: String!
    $competitionId: String!
    $includeForfeits: Boolean!
  ) {
    stats: MATCHES_STATS(
      teamId: $teamId
      seasonId: $seasonId
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
