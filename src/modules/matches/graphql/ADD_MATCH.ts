import { gql } from '@apollo/client';

export const ADD_MATCH = gql`
  mutation ADD_MATCH(
    $teamId: ID!
    $seasonId: ID!
    $opponentId: ID!
    $competitionId: ID!
    $opponentGoals: Float!
    $teamGoals: Float!
    $date: String!
    $isHome: Boolean!
    $isForfeit: Boolean!
    $leaguePosition: Float
    $matchPlayers: [TPlayerInMatchInput!]!
  ) {
    match: ADD_MATCH(
      data: {
        teamId: $teamId
        seasonId: $seasonId
        date: $date
        competitionId: $competitionId
        opponentId: $opponentId
        teamGoals: $teamGoals
        opponentGoals: $opponentGoals
        isHome: $isHome
        isForfeit: $isForfeit
        leaguePosition: $leaguePosition
        matchPlayers: $matchPlayers
      }
    ) {
      _id
    }
  }
`;
