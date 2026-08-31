import { gql } from '@apollo/client';

export const FETCH_PLAYERS_BY_TEAM = gql`
  query FETCH_PLAYERS_BY_TEAM($teamId: String!, $orgSeasonId: String) {
    players: PLAYERS_BY_TEAM(teamId: $teamId, orgSeasonId: $orgSeasonId) {
      _id
      name
    }
  }
`;
