import { TypedDocumentNode, gql } from '@apollo/client';
import { ISquadSeasonStats } from '../types';

export const FETCH_SQUAD_STATS: TypedDocumentNode<{
  stats: ISquadSeasonStats[];
}> = gql`
  query FETCH_SQUAD_STATS($teamId: String!, $seasonId: String!, $competitionId: String!) {
    stats: SQUAD_STATS(teamId: $teamId, seasonId: $seasonId, competitionId: $competitionId) {
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
