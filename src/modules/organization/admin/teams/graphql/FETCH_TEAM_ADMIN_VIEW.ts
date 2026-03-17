import { gql } from '@apollo/client';

export const FETCH_TEAM_ADMIN_VIEW = gql`
  query FETCH_TEAM_ADMIN_VIEW($teamId: String!) {
    team: FETCH_TEAM_ADMIN_VIEW(teamId: $teamId) {
      teamName
      teamAdminAccessCode
      adminUsers {
        username
        email
      }
    }
  }
`;
