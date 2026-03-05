import { gql } from '@apollo/client';

export const VERIFY_EMAIL = gql`
  mutation VERIFY_EMAIL($token: String!) {
    VERIFY_EMAIL(data: { token: $token }) {
      email
    }
  }
`;
