import { TypedDocumentNode, gql } from '@apollo/client';

export const DELETE_USER: TypedDocumentNode = gql`
  mutation DELETE_USER {
    deleteUser {
      _id
    }
  }
`;
