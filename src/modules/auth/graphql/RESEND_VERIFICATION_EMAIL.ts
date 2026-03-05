import { gql } from '@apollo/client';

export const RESEND_VERIFICATION_EMAIL = gql`
  mutation RESEND_VERIFICATION_EMAIL($email: String!, $turnstileToken: String!) {
    RESEND_VERIFICATION_EMAIL(data: { email: $email, turnstileToken: $turnstileToken }) {
      email
    }
  }
`;
