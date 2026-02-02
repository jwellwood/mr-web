import { gql } from '@apollo/client';

export const FETCH_TEAMS_BY_SEARCH = gql`
  query FETCH_TEAMS_BY_SEARCH($filter: String!) {
    teams: TEAM_BY_SEARCH(filter: $filter) {
      _id
      teamName
      location
      country
      teamBadge {
        url
        public_id
      }
      isActive
      orgId {
        _id
      }
    }
  }
`;
