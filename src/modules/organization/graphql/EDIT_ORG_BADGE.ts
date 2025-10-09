import { TypedDocumentNode, gql } from '@apollo/client';

export const EDIT_ORG_BADGE: TypedDocumentNode = gql`
  mutation EditOrgBadge($orgId: String!, $public_id: String!, $url: String!) {
    editOrgBadge(orgId: $orgId, data: { public_id: $public_id, url: $url }) {
      _id
      badge {
        public_id
        url
      }
    }
  }
`;
