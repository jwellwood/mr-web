import { TypedDocumentNode, gql } from '@apollo/client';
import { IResult } from '../types';

export const FETCH_RESULT: TypedDocumentNode<{
  result: IResult;
}> = gql`
  query FETCH_RESULT($resultId: String!) {
    result: RESULT(resultId: $resultId) {
      _id
      date
      gameWeek
      competitionId {
        _id
        name
      }
      orgSeasonId {
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
