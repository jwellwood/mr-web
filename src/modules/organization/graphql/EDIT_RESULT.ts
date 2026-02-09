import { TypedDocumentNode, gql } from '@apollo/client';
import { IResult } from './../types';

export const EDIT_RESULT: TypedDocumentNode<{
  result: IResult;
}> = gql`
  mutation EDIT_RESULT(
    $orgId: String!
    $resultId: String!
    $orgSeasonId: ID!
    $competitionId: ID!
    $date: String!
    $gameWeek: Float!
    $homeTeam: ID!
    $awayTeam: ID!
    $homeGoals: Float!
    $awayGoals: Float!
  ) {
    result: EDIT_RESULT(
      orgId: $orgId
      resultId: $resultId
      data: {
        date: $date
        gameWeek: $gameWeek
        homeTeam: $homeTeam
        awayTeam: $awayTeam
        homeGoals: $homeGoals
        awayGoals: $awayGoals
        competitionId: $competitionId
        orgSeasonId: $orgSeasonId
      }
    ) {
      _id
    }
  }
`;
