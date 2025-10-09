import { TypedDocumentNode, gql } from '@apollo/client';

export const LOG_OUT_USER: TypedDocumentNode = gql`
  mutation LogOutUser {
    user: logOutUser {
      _id
    }
  }
`;
