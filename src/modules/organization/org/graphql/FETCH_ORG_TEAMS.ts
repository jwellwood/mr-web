import { gql } from '@apollo/client';

export const FETCH_ORG_TEAMS = gql`
  query FETCH_ORG_TEAMS($orgId: String!) {
    teams: TEAMS_BY_ORG(orgId: $orgId) {
      _id
      teamName
      isActive
      teamBadge {
        public_id
        url
      }
    }
  }
`;
