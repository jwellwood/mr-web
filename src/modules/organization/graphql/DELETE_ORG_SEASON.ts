import { TypedDocumentNode, gql } from '@apollo/client';

export const DELETE_ORG_SEASON: TypedDocumentNode = gql`
  mutation DELETE_ORG_SEASON($orgId: String!, $orgSeasonId: String!) {
    deleteOrgSeason(orgId: $orgId, orgSeasonId: $orgSeasonId) {
      _id
    }
  }
`;
