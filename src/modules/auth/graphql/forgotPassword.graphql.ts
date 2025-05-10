import { TypedDocumentNode, gql } from '@apollo/client';
import { IUser } from '../../../types';
export const FORGOT_PASSWORD: TypedDocumentNode<{ user: IUser }> = gql`
  mutation ForgotPassword($email: String!) {
    user: forgotPassword(data: { email: $email }) {
      _id
      email
    }
  }
`;
