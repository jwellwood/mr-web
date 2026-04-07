import { gql } from '@apollo/client';

export const EDIT_SEASON = gql`
  mutation EDIT_SEASON(
    $teamId: String!
    $seasonId: String!
    $yearStarted: String!
    $yearEnded: String!
    $leaguePosition: Float
    $totalFinalPositions: Float
    $division: String
    $comment: String
  ) {
    season: EDIT_SEASON(
      teamId: $teamId
      seasonId: $seasonId
      data: {
        yearStarted: $yearStarted
        yearEnded: $yearEnded
        leaguePosition: $leaguePosition
        totalFinalPositions: $totalFinalPositions
        division: $division
        comment: $comment
      }
    ) {
      _id
    }
  }
`;
