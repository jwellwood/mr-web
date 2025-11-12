import { TypedDocumentNode, gql } from '@apollo/client';
import { IUser } from '../types';

export const SIGN_IN_USER: TypedDocumentNode<{ user: IUser }> = gql`
  mutation SIGN_IN_USER($email: String!, $password: String!) {
    user: signInUser(data: { email: $email, password: $password }) {
      username
      email
      roles
      token
      teamIds
      orgIds
    }
  }
`;
