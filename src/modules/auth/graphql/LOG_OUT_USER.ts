import { TypedDocumentNode, gql } from '@apollo/client';

export const LOG_OUT_USER: TypedDocumentNode = gql`
  mutation LOG_OUT_USER {
    user: logOutUser {
      _id
    }
  }
`;
