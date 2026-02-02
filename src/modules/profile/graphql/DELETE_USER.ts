import { gql } from '@apollo/client';

export const DELETE_USER = gql`
  mutation DELETE_USER {
    DELETE_USER {
      _id
    }
  }
`;
