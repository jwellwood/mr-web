import { gql } from '@apollo/client';

export const FETCH_ORG_TROPHIES = gql`
  query FETCH_ORG_TROPHIES($orgSeasonId: String!) {
    trophies: ORG_TROPHIES_BY_SEASON(orgSeasonId: $orgSeasonId) {
      _id
      competitionId
      competitionName
      winningTeamId
      winningTeamName
      runnerUpTeamId
      runnerUpTeamName
      year
      comment
    }
  }
`;
