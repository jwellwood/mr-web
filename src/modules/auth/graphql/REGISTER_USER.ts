import { gql } from '@apollo/client';

export const REGISTER_USER = gql`
  mutation REGISTER_USER(
    $username: String!
    $email: String!
    $password: String!
    $turnstileToken: String!
  ) {
    user: REGISTER_USER(
      data: {
        username: $username
        email: $email
        password: $password
        turnstileToken: $turnstileToken
      }
    ) {
      username
      email
      roles
    }
  }
`;
