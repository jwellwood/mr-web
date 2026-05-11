import { gql } from '@apollo/client';

export const FETCH_SQUAD_STATS = gql`
  query FETCH_SQUAD_STATS(
    $teamId: String!
    $seasonId: String!
    $competitionId: String!
    $page: Int = 1
    $limit: Int = 20
    $sortBy: String = "apps"
  ) {
    stats: SQUAD_STATS(
      teamId: $teamId
      seasonId: $seasonId
      competitionId: $competitionId
      page: $page
      limit: $limit
      sortBy: $sortBy
    ) {
      players {
        _id
        name
        dateOfBirth
        apps
        goals
        assists
        mvp
        conceded
        cleanSheets
        goalsPerGame
        assistsPerGame
        concededPerGame
        mvpPerGame
      }
      total
      page
      totalPages
    }
  }
`;
