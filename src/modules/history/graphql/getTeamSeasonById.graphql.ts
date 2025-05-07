import { TypedDocumentNode, gql } from '@apollo/client';
import { ITeamSeason } from '../types';

export const GET_TEAM_SEASON_BY_ID: TypedDocumentNode<{
  season: ITeamSeason;
}> = gql`
  query GetTeamSeasonById($seasonId: String!) {
    season: teamSeasonById(seasonId: $seasonId) {
      _id
      name
      yearStarted
      yearEnded
      leaguePosition
      division
      comment
    }
  }
`;
