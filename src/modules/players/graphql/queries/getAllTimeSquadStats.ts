import { TypedDocumentNode, gql } from '@apollo/client';

export const GET_ALL_TIME_SQUAD_STATS: TypedDocumentNode<{
  stats: any;
}> = gql`
  query GetAllTimeSquadStats($teamId: String!) {
    stats: allTimeSquadStats(teamId: $teamId) {
      _id
      name
      nationality
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
