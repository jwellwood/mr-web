import { TypedDocumentNode, gql } from '@apollo/client';
import { ITeamSeason } from '../types';

export const ADD_SEASON: TypedDocumentNode<{
  season: ITeamSeason;
}> = gql`
  mutation ADD_SEASON(
    $teamId: String!
    $yearStarted: String!
    $yearEnded: String!
    $division: String
    $leaguePosition: Float
    $totalFinalPositions: Float
    $comment: String
  ) {
    season: addTeamSeason(
      teamId: $teamId
      data: {
        yearStarted: $yearStarted
        yearEnded: $yearEnded
        division: $division
        leaguePosition: $leaguePosition
        totalFinalPositions: $totalFinalPositions
        comment: $comment
      }
    ) {
      _id
      name
    }
  }
`;
