import { TypedDocumentNode, gql } from '@apollo/client';

export const DELETE_USER: TypedDocumentNode = gql`
  mutation DeleteUser {
    deleteUser {
      _id
    }
  }
`;
