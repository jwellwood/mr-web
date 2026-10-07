import { gql } from '@apollo/client';

export const DELETE_ORG_TROPHY = gql`
  mutation DELETE_ORG_TROPHY($orgId: String!, $orgTrophyId: String!) {
    trophy: DELETE_ORG_TROPHY(orgId: $orgId, orgTrophyId: $orgTrophyId) {
      _id
    }
  }
`;
