import { gql } from '@apollo/client';

export const EDIT_PASSWORD = gql`
  mutation EDIT_PASSWORD($password: String!, $newPassword: String!) {
    EDIT_PASSWORD(data: { password: $password, newPassword: $newPassword }) {
      _id
    }
  }
`;
