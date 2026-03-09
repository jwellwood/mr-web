import { gql } from '@apollo/client';

export const SIGN_IN_USER = gql`
  mutation SIGN_IN_USER($email: String!, $password: String!) {
    user: SIGN_IN_USER(data: { email: $email, password: $password }) {
      token
      user {
        username
        email
        roles
        teamIds
        orgIds
      }
    }
  }
`;
