import { TypedDocumentNode, gql } from '@apollo/client';
import { ITeamSeason } from '../types';

export const DELETE_SEASON: TypedDocumentNode<{
  season: ITeamSeason;
}> = gql`
  mutation DELETE_SEASON($teamId: String!, $seasonId: String!) {
    season: deleteSeason(teamId: $teamId, seasonId: $seasonId) {
      _id
    }
  }
`;
