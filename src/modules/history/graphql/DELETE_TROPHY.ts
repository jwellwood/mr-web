import { gql } from '@apollo/client';

export const DELETE_TROPHY = gql`
  mutation DELETE_TROPHY($teamId: String!, $trophyId: String!) {
    trophy: deleteTrophy(teamId: $teamId, trophyId: $trophyId) {
      _id
    }
  }
`;
