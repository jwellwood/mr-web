import { gql } from '@apollo/client';

export const EDIT_RESULT = gql`
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
    $isForfeit: Boolean!
    $isComplete: Boolean!
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
        isForfeit: $isForfeit
        isComplete: $isComplete
      }
    ) {
      _id
    }
  }
`;
