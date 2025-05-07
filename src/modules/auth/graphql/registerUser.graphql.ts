import { TypedDocumentNode, gql } from '@apollo/client';
import { IUser } from 'types';

export const REGISTER_USER: TypedDocumentNode<{ user: IUser }> = gql`
  mutation RegisterUser(
    $username: String!
    $email: String!
    $password: String!
  ) {
    user: registerUser(
      data: { username: $username, email: $email, password: $password }
    ) {
      username
      email
      roles
    }
  }
`;
