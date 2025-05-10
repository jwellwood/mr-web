import { TypedDocumentNode, gql } from '@apollo/client';
import { IUser } from '../../../types';
export const EDIT_PROFILE: TypedDocumentNode<{
  user: IUser;
}> = gql`
  mutation EditUser(
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
