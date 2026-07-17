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
    $decision: ResultDecision
    $winnerSide: ResultSide
    $matchPlayers: [TPlayerInMatchInput!]!
  ) {
    EDIT_MATCH(
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
        decision: $decision
        winnerSide: $winnerSide
        matchPlayers: $matchPlayers
      }
    ) {
      _id
    }
  }
`;
