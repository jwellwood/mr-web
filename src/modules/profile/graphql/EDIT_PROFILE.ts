import { gql } from '@apollo/client';

export const EDIT_PROFILE = gql`
  mutation EDIT_PROFILE(
    $username: String!
    $email: String!
    $dateOfBirth: String
    $nationality: String
  ) {
    editUser(
      data: {
        username: $username
        email: $email
        nationality: $nationality
        dateOfBirth: $dateOfBirth
      }
    ) {
      username
      email
      nationality
      dateOfBirth
    }
  }
`;
