import { TypedDocumentNode, gql } from '@apollo/client';

export const EDIT_ORG_BADGE: TypedDocumentNode = gql`
  mutation EDIT_ORG_BADGE($orgId: String!, $public_id: String!, $url: String!) {
    EDIT_ORG_BADGE(orgId: $orgId, data: { public_id: $public_id, url: $url }) {
      _id
      badge {
        public_id
        url
      }
    }
  }
`;
