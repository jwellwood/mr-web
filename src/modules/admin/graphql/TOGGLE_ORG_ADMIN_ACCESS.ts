import { gql } from '@apollo/client';

export const TOGGLE_ORG_ADMIN_ACCESS = gql`
  mutation TOGGLE_ORG_ADMIN_ACCESS($orgId: String!, $enabled: Boolean!) {
    TOGGLE_ORG_ADMIN_ACCESS(orgId: $orgId, enabled: $enabled) {
      _id
    }
  }
`;
