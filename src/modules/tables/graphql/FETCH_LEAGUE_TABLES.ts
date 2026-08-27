import { gql } from '@apollo/client';

export const FETCH_LEAGUE_TABLES = gql`
  query FETCH_LEAGUE_TABLES($orgId: String!, $orgSeasonId: String!, $compId: String!) {
    data: LEAGUE_TABLE_DATA(orgId: $orgId, orgSeasonId: $orgSeasonId, compId: $compId) {
      team {
        _id
        teamName
      }
      played
      wins
      draws
      losses
      goalsFor
      goalsAgainst
      goalDiff
      points
      startingPoints
    }
  }
`;
