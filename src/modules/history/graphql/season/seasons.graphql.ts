import { TypedDocumentNode, gql } from '@apollo/client';
import { ITeamSeason } from '../../types';

export const GET_TEAM_SEASONS: TypedDocumentNode<{
  seasons: ITeamSeason[];
}> = gql`
  query GetTeamSeasons($teamId: String!) {
    seasons: teamSeasonsByTeam(teamId: $teamId) {
      _id
      name
      yearStarted
      yearEnded
      leaguePosition
      totalFinalPositions
      division
    }
  }
`;
