import { TypedDocumentNode, gql } from '@apollo/client';

export const RESET_PASSWORD: TypedDocumentNode = gql`
  mutation ResetPassword($password: String!, $token: String!) {
    user: resetPassword(data: { password: $password, token: $token }) {
      _id
    }
  }
`;
