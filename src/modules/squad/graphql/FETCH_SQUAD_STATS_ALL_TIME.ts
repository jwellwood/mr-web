import { TypedDocumentNode, gql } from '@apollo/client';
import { IPlayer } from '../../players/types';

export const FETCH_SQUAD_STATS_ALL_TIME: TypedDocumentNode<{
  stats: IPlayer[];
}> = gql`
  query FETCH_SQUAD_STATS_ALL_TIME($teamId: String!) {
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
