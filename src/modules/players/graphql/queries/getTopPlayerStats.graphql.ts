import { TypedDocumentNode, gql } from '@apollo/client';

export const GET_TOP_PLAYER_STATS: TypedDocumentNode<{
  stats: object;
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
