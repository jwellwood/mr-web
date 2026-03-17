import { gql } from '@apollo/client';

export const SET_TEAM_ADMIN_ACCESS_CODE = gql`
  mutation SET_TEAM_ADMIN_ACCESS_CODE($teamId: String!, $code: String!) {
    SET_TEAM_ADMIN_ACCESS_CODE(teamId: $teamId, data: { code: $code }) {
      _id
    }
  }
`;
