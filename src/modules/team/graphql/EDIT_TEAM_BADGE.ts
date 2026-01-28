import { gql } from '@apollo/client';

export const EDIT_TEAM_BADGE = gql`
  mutation EDIT_TEAM_BADGE($teamId: String!, $public_id: String!, $url: String!) {
    EDIT_TEAM_BADGE(teamId: $teamId, data: { public_id: $public_id, url: $url }) {
      _id
      teamBadge {
        public_id
        url
      }
    }
  }
`;
