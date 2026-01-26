import { gql } from '@apollo/client';

export const FETCH_SQUAD_STATS = gql`
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
