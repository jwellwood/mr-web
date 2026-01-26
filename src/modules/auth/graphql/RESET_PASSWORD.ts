import { gql } from '@apollo/client';

export const RESET_PASSWORD = gql`
  mutation RESET_PASSWORD($password: String!, $token: String!) {
    user: resetPassword(data: { password: $password, token: $token }) {
      _id
    }
  }
`;
