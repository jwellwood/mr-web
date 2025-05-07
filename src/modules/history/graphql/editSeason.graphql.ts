import { TypedDocumentNode, gql } from '@apollo/client';
import { ITeamSeason } from '../types';

export const EDIT_SEASON: TypedDocumentNode<{
  season: ITeamSeason;
}> = gql`
  mutation EditSeason(
    $teamId: String!
    $seasonId: String!
    $yearStarted: String!
    $yearEnded: String!
    $leaguePosition: Float
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
        division: $division
        comment: $comment
      }
    ) {
      _id
    }
  }
`;
