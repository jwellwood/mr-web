import { gql } from '@apollo/client';

export const FORGOT_PASSWORD = gql`
  mutation FORGOT_PASSWORD($email: String!, $turnstileToken: String!) {
    FORGOT_PASSWORD(data: { email: $email, turnstileToken: $turnstileToken })
  }
`;
