import { gql } from '@apollo/client';

export const REQUEST_ORG_ADMIN_ACCESS = gql`
  mutation REQUEST_ORG_ADMIN_ACCESS($orgId: String!, $code: String!) {
    REQUEST_ORG_ADMIN_ACCESS(orgId: $orgId, data: { code: $code }) {
      token
    }
  }
`;
