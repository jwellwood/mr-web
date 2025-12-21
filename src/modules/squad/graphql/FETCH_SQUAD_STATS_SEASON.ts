import { TypedDocumentNode, gql } from '@apollo/client';
import { ISquadSeasonStats } from '../types';

export const FETCH_SQUAD_STATS_SEASON: TypedDocumentNode<{
  stats: ISquadSeasonStats[];
}> = gql`
  query FETCH_SQUAD_STATS_SEASON($teamId: String!, $seasonId: String!) {
    stats: SQUAD_STATS_SEASON(teamId: $teamId, seasonId: $seasonId) {
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
