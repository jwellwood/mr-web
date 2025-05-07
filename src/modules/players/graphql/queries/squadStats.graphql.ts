import { TypedDocumentNode, gql } from '@apollo/client';

export const GET_SQUAD_SEASON_STATS: TypedDocumentNode<{
  stats: any;
}> = gql`
  query GetSquadSeasonStats($teamId: String!, $seasonId: String!) {
    stats: squadSeasonStats(teamId: $teamId, seasonId: $seasonId) {
      _id
      name
      nationality
      dateOfBirth
      apps
      goals
      assists
      mvp
      conceded
      cleanSheets
      goalsPerGame
      assistsPerGame
      concededPerGame
      mvpPerGame
    }
  }
`;
