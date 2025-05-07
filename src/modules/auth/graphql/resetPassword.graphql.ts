import { TypedDocumentNode, gql } from '@apollo/client';
import { IUser } from 'types';

export const RESET_PASSWORD: TypedDocumentNode<{ user: IUser }> = gql`
  mutation ResetPassword($password: String!, $token: String!) {
    user: resetPassword(data: { password: $password, token: $token }) {
      _id
    }
  }
`;
