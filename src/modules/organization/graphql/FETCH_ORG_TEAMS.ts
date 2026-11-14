import { gql } from '@apollo/client';

export const FETCH_ORG_TEAMS = gql`
  query FETCH_ORG_TEAMS($orgId: String!, $includeInactive: Boolean) {
    teams: TEAMS_BY_ORG(orgId: $orgId, includeInactive: $includeInactive) {
      _id
      teamName
      isActive
      teamBadge {
        public_id
        url
      }
      homeShirt
      awayShirt
    }
  }
`;
