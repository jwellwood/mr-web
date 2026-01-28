import { gql } from '@apollo/client';

export const EDIT_MATCH = gql`
  mutation EDIT_MATCH(
    $matchId: String!
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
    editMatch(
      matchId: $matchId
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
