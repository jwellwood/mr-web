import { TypedDocumentNode, gql } from '@apollo/client';
import { ITeamSeason } from '../types';

export const EDIT_SEASON: TypedDocumentNode<{
  season: ITeamSeason;
}> = gql`
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
    season: editSeason(
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
