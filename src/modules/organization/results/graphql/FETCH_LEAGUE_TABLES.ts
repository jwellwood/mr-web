import { gql } from '@apollo/client';

export const FETCH_LEAGUE_TABLES = gql`
  query FETCH_LEAGUE_TABLES($orgId: String!, $orgSeasonId: String!) {
    data: LEAGUE_TABLE_DATA(orgId: $orgId, orgSeasonId: $orgSeasonId) {
      competition {
        _id
        name
      }
      data {
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
      }
    }
  }
`;
