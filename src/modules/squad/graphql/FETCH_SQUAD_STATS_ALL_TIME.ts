import { TypedDocumentNode, gql } from '@apollo/client';
import { ISquadSeasonStats } from '../types';

export const FETCH_SQUAD_STATS_ALL_TIME: TypedDocumentNode<{
  stats: ISquadSeasonStats[];
}> = gql`
  query FETCH_SQUAD_STATS_ALL_TIME($teamId: String!) {
    stats: SQUAD_STATS_ALL_TIME(teamId: $teamId) {
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
