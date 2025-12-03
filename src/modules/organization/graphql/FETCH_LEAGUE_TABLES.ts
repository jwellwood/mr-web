import { TypedDocumentNode, gql } from '@apollo/client';
import { ILeagueTableData } from '../types';

export const FETCH_LEAGUE_TABLES: TypedDocumentNode<{
  data: ILeagueTableData[];
}> = gql`
  query FETCH_LEAGUE_TABLES($orgId: String!, $orgSeasonId: String!) {
    data: getLeagueTableData(orgId: $orgId, orgSeasonId: $orgSeasonId) {
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
