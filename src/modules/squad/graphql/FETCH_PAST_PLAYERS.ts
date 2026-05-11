import { gql } from '@apollo/client';

export const FETCH_PAST_PLAYERS = gql`
  query FETCH_PAST_PLAYERS(
    $teamId: String!
    $page: Int = 1
    $limit: Int = 20
    $sortBy: String = "left"
  ) {
    players: PAST_PLAYERS(teamId: $teamId, page: $page, limit: $limit, sortBy: $sortBy) {
      players {
        _id
        name
        nationality
        joined
        left
        seasons
        position
        image
      }
      total
      page
      totalPages
    }
  }
`;
