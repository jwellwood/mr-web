import { gql } from '@apollo/client';

export const DELETE_PLAYER = gql`
  mutation DELETE_PLAYER($teamId: String!, $playerId: String!) {
    DELETE_PLAYER(teamId: $teamId, playerId: $playerId) {
      _id
    }
  }
`;
