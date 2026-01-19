import { TypedDocumentNode, gql } from '@apollo/client';
import { TStatField } from '../types';

export const FETCH_SQUAD_RECORDS: TypedDocumentNode<{
  stats: {
    apps: TStatField[];
    goals: TStatField[];
    assists: TStatField[];
    mvp: TStatField[];
  };
}> = gql`
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
