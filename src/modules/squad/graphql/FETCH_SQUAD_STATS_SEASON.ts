import { TypedDocumentNode, gql } from '@apollo/client';

export const FETCH_SQUAD_STATS_SEASON: TypedDocumentNode<{
  stats: object[];
}> = gql`
  query FETCH_SQUAD_STATS_SEASON($teamId: String!, $seasonId: String!) {
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
