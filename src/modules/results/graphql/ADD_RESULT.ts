import { gql } from '@apollo/client';

export const ADD_RESULT = gql`
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
    $isForfeit: Boolean!
    $isComplete: Boolean!
  ) {
    result: ADD_RESULT(
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
        isForfeit: $isForfeit
        isComplete: $isComplete
      }
    ) {
      _id
    }
  }
`;
