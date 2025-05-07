import { TypedDocumentNode, gql } from '@apollo/client';
import { IUser } from 'types';

export const GET_USER: TypedDocumentNode<{
  user: IUser;
}> = gql`
  query GetUser {
    user {
      _id
      isVerified
      username
      email
      roles
      createdAt
      updatedAt
      image {
        url
        public_id
      }
      dateOfBirth
      nationality
    }
  }
`;
