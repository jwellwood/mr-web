import { TypedDocumentNode, gql } from '@apollo/client';
import { IUser } from '../../../types';

export const SIGN_IN: TypedDocumentNode<{ user: IUser }> = gql`
  mutation SignInUser($email: String!, $password: String!) {
    user: signInUser(data: { email: $email, password: $password }) {
      username
      email
      roles
      token
    }
  }
`;
