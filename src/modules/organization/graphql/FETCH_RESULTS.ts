import { TypedDocumentNode, gql } from '@apollo/client';
import { IResult } from '../types';

export const FETCH_RESULTS: TypedDocumentNode<{
  results: IResult[];
}> = gql`
  query FETCH_RESULTS($orgId: String!, $orgSeasonId: String!) {
    results: RESULTS(orgId: $orgId, orgSeasonId: $orgSeasonId) {
      _id
      date
      gameWeek
      competitionId {
        _id
        name
      }
      homeTeam {
        _id
        teamName
      }
      awayTeam {
        _id
        teamName
      }
      homeGoals
      awayGoals
    }
  }
`;
