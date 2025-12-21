import { TypedDocumentNode, gql } from '@apollo/client';
import { IUser } from '../../auth/types';

export const FETCH_USER: TypedDocumentNode<{
  user: IUser;
}> = gql`
  query FETCH_USER {
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
