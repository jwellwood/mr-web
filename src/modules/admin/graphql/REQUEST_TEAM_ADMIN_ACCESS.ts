import { gql } from '@apollo/client';

export const REQUEST_TEAM_ADMIN_ACCESS = gql`
  mutation REQUEST_TEAM_ADMIN_ACCESS($teamId: String!, $code: String!) {
    REQUEST_TEAM_ADMIN_ACCESS(teamId: $teamId, data: { code: $code }) {
      token
    }
  }
`;
