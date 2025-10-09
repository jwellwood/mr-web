import { TypedDocumentNode, gql } from '@apollo/client';

export const EDIT_PASSWORD: TypedDocumentNode = gql`
  mutation EditPassword($password: String!, $newPassword: String!) {
    editPassword(data: { password: $password, newPassword: $newPassword }) {
      _id
    }
  }
`;
