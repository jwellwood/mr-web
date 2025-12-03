import { IResult } from './../types';
import { TypedDocumentNode, gql } from '@apollo/client';

export const ADD_RESULT: TypedDocumentNode<{
  result: IResult;
}> = gql`
  mutation ADD_RESULT(
    $orgId: String!
    $orgSeasonId: ID!
    $competitionId: ID!
    $date: String!
    $gameWeek: Float!
    $homeTeam: ID!
    $awayTeam: ID!
    $homeGoals: Float!
    $awayGoals: Float!
  ) {
    result: addResult(
      orgId: $orgId
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
