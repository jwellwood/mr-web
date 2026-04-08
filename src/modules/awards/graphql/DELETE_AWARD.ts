import { gql } from '@apollo/client';

export const DELETE_AWARD = gql`
  mutation DELETE_AWARD($teamId: String!, $awardId: String!) {
    award: DELETE_AWARD(teamId: $teamId, awardId: $awardId) {
      _id
    }
  }
`;
