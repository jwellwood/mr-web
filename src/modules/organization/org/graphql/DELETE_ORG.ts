import { gql } from '@apollo/client';

export const DELETE_ORG = gql`
  mutation DELETE_ORG($orgId: String!) {
    DELETE_ORGANIZATION(orgId: $orgId) {
      _id
    }
  }
`;
