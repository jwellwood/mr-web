import { TypedDocumentNode, gql } from '@apollo/client';

type TStatField = {
  value: number;
  disabled: boolean;
  names: {
    name: string;
    id: string;
  }[];
}[];

export const GET_TOP_PLAYER_STATS: TypedDocumentNode<{
  stats: {
    apps: TStatField;
    goals: TStatField;
    assists: TStatField;
    mvp: TStatField;
  };
}> = gql`
  query GetTopPlayerStats($teamId: String!) {
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
