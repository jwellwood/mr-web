import { TypedDocumentNode, gql } from '@apollo/client';
import { IUser } from '../types';

export const FORGOT_PASSWORD: TypedDocumentNode<{ user: IUser }> = gql`
  mutation FORGOT_PASSWORD($email: String!) {
    user: forgotPassword(data: { email: $email }) {
      _id
      email
    }
  }
`;
