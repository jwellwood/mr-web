import { gql } from '@apollo/client';

export const FETCH_GOALSCORER_LEADERBOARD = gql`
  query FETCH_GOALSCORER_LEADERBOARD(
    $orgId: String!
    $orgSeasonId: String!
    $competitionId: String!
    $teamId: String!
    $page: Int!
    $limit: Int!
  ) {
    data: GOALSCORER_LEADERBOARD(
      orgId: $orgId
      orgSeasonId: $orgSeasonId
      competitionId: $competitionId
      teamId: $teamId
      page: $page
      limit: $limit
    ) {
      entries {
        goals
        player {
          _id
          name
        }
        team {
          _id
          teamName
          badgeUrl
        }
      }
      total
      page
      totalPages
    }
  }
`;
