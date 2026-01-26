import { gql } from '@apollo/client';

export const FETCH_SQUAD_LIST_BY_SEASON = gql`
  query FETCH_SQUAD_LIST_BY_SEASON($teamId: String!, $seasonId: String!) {
    players: SQUAD_LIST_BY_SEASON(teamId: $teamId, seasonId: $seasonId) {
      _id
      name
      position
      number
      image {
        url
        public_id
      }
      nationality
      apps
      goals
      assists
    }
  }
`;
