import { gql } from '@apollo/client';

export const FETCH_GOALSCORER_LEADERBOARD = gql`
  query FETCH_GOALSCORER_LEADERBOARD(
    $orgId: String!
    $orgSeasonId: String!
    $competitionId: String!
  ) {
    data: GOALSCORER_LEADERBOARD(
      orgId: $orgId
      orgSeasonId: $orgSeasonId
      competitionId: $competitionId
    ) {
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
  }
`;
