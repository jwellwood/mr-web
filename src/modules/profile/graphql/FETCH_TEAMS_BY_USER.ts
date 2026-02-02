import { gql } from '@apollo/client';

export const FETCH_TEAMS_BY_USER = gql`
  query FETCH_TEAMS_BY_USER {
    teams: USER_TEAMS {
      _id
      teamName
      country
      isActive
      teamBadge {
        public_id
        url
      }
      orgId {
        _id
      }
    }
  }
`;
