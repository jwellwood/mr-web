import { gql } from '@apollo/client';

export const SET_ORG_ADMIN_ACCESS_CODE = gql`
  mutation SET_ORG_ADMIN_ACCESS_CODE($orgId: String!) {
    SET_ORG_ADMIN_ACCESS_CODE(orgId: $orgId) {
      _id
    }
  }
`;
