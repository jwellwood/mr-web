import { gql } from '@apollo/client';

export const FETCH_SQUAD_RECORDS = gql`
  query FETCH_SQUAD_RECORDS($teamId: String!) {
    stats: SQUAD_RECORDS(teamId: $teamId) {
      apps {
        value
        names {
          id
          name
        }
      }
      goals {
        value
        names {
          id
          name
        }
      }
      assists {
        value
        names {
          id
          name
        }
      }
      mvp {
        value
        names {
          id
          name
        }
      }
    }
  }
`;
