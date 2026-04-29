import { gql } from '@apollo/client';

export const ADD_SEASON = gql`
  mutation ADD_SEASON(
    $teamId: String!
    $yearStarted: String!
    $yearEnded: String!
    $division: String
    $leaguePosition: Float
    $totalFinalPositions: Float
    $comment: String
    $orgSeasonId: String
  ) {
    season: ADD_SEASON(
      teamId: $teamId
      data: {
        yearStarted: $yearStarted
        yearEnded: $yearEnded
        division: $division
        leaguePosition: $leaguePosition
        totalFinalPositions: $totalFinalPositions
        comment: $comment
        orgSeasonId: $orgSeasonId
      }
    ) {
      _id
      name
    }
  }
`;
