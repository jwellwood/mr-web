import { gql } from '@apollo/client';

export const FETCH_SQUAD_SINGLE_SEASON_RECORDS = gql`
  query FETCH_SQUAD_SINGLE_SEASON_RECORDS($teamId: String!) {
    stats: SQUAD_SINGLE_SEASON_RECORDS(teamId: $teamId) {
      goals {
        value
        player {
          id
          name
        }
        season {
          id
          name
        }
      }
      assists {
        value
        player {
          id
          name
        }
        season {
          id
          name
        }
      }
      combined {
        value
        player {
          id
          name
        }
        season {
          id
          name
        }
      }
    }
  }
`;
