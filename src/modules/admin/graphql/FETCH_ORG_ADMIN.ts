import { gql } from '@apollo/client';

export const FETCH_ORG_ADMIN_VIEW = gql`
  query FETCH_ORG_ADMIN_VIEW($orgId: String!) {
    org: FETCH_ORG_ADMIN_VIEW(orgId: $orgId) {
      orgName
      orgAdminAccessCode
      orgAdminAccessEnabled
      adminUsers {
        username
        email
      }
    }
  }
`;
