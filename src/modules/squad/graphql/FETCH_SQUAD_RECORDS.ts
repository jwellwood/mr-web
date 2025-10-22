import { TypedDocumentNode, gql } from '@apollo/client';

type TStatField = {
  value: number;
  disabled: boolean;
  names: {
    name: string;
    id: string;
  }[];
}[];

export const FETCH_SQUAD_RECORDS: TypedDocumentNode<{
  stats: {
    apps: TStatField;
    goals: TStatField;
    assists: TStatField;
    mvp: TStatField;
  };
}> = gql`
  query FETCH_SQUAD_RECORDS($teamId: String!) {
    stats: topPlayerStats(teamId: $teamId) {
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
