import { TypedDocumentNode, gql } from '@apollo/client';
import { IUser } from 'types';

export const DELETE_USER: TypedDocumentNode<{
  user: IUser;
}> = gql`
  mutation DeleteUser {
    deleteUser {
      _id
    }
  }
`;
