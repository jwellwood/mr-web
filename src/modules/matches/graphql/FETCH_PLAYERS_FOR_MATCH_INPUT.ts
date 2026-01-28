import { gql } from '@apollo/client';

export const FETCH_PLAYERS_FOR_MATCH_INPUT = gql`
  query FETCH_PLAYERS_FOR_MATCH_INPUT($teamId: String!, $seasonId: String!) {
    players: SQUAD_BY_SEASON(teamId: $teamId, seasonId: $seasonId) {
      _id
      name
      position
    }
  }
`;
