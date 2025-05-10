import { TypedDocumentNode, gql } from '@apollo/client';
import { IUser } from '../../../types';
export const EDIT_PASSWORD: TypedDocumentNode<{
  user: IUser;
}> = gql`
  mutation EditPassword($password: String!, $newPassword: String!) {
    editPassword(data: { password: $password, newPassword: $newPassword }) {
      _id
    }
  }
`;
