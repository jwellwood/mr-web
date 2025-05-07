import { TypedDocumentNode, gql } from '@apollo/client';
import { ITeamSeason } from '../types';

export const ADD_TEAM_SEASON: TypedDocumentNode<{
  season: ITeamSeason;
}> = gql`
  mutation AddTeamSeason(
    $teamId: String!
    $yearStarted: String!
    $yearEnded: String!
    $leaguePosition: Float
    $comment: String
  ) {
    season: addTeamSeason(
      teamId: $teamId
      data: {
        yearStarted: $yearStarted
        yearEnded: $yearEnded
        leaguePosition: $leaguePosition
        comment: $comment
      }
    ) {
      _id
      name
    }
  }
`;
