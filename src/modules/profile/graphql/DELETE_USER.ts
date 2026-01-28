import { gql } from '@apollo/client';

export const DELETE_USER = gql`
  mutation DELETE_USER {
    deleteUser {
      _id
    }
  }
`;
