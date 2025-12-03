import { TypedDocumentNode, gql } from '@apollo/client';

export const DELETE_ORG: TypedDocumentNode = gql`
  mutation DELETE_ORG($orgId: String!) {
    deleteOrg(orgId: $orgId) {
      _id
    }
  }
`;
