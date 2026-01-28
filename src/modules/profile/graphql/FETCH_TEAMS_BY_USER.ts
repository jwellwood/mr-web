import { gql } from '@apollo/client';

export const FETCH_TEAMS_BY_USER = gql`
  query FETCH_TEAMS_BY_USER {
    teams: userTeams {
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
