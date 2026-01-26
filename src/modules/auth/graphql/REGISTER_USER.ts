import { gql } from '@apollo/client';

export const REGISTER_USER = gql`
  mutation REGISTER_USER($username: String!, $email: String!, $password: String!) {
    user: registerUser(data: { username: $username, email: $email, password: $password }) {
      username
      email
      roles
    }
  }
`;
