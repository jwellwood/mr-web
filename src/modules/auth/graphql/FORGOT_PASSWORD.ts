import { gql } from '@apollo/client';

export const FORGOT_PASSWORD = gql`
  mutation FORGOT_PASSWORD($email: String!) {
    user: FORGOT_PASSWORD(data: { email: $email }) {
      _id
      email
    }
  }
`;
