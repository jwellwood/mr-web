import { gql } from '@apollo/client';

export const DELETE_ORG_SEASON = gql`
  mutation DELETE_ORG_SEASON($orgId: String!, $orgSeasonId: String!) {
    DELETE_ORG_SEASON(orgId: $orgId, orgSeasonId: $orgSeasonId) {
      _id
    }
  }
`;
