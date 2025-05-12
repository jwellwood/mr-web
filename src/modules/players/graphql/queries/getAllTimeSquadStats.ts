import { TypedDocumentNode, gql } from '@apollo/client';
import { IPlayer } from '../../../../types';

export const GET_ALL_TIME_SQUAD_STATS: TypedDocumentNode<{
  stats: IPlayer[];
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
