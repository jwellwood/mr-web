import { TypedDocumentNode, gql } from '@apollo/client';
import { IUser } from '../types';

export const FETCH_ROLES: TypedDocumentNode<{
  user: IUser;
}> = gql`
  query FETCH_ROLES {
    user {
      _id
      roles
      teamIds
      orgIds
    }
  }
`;
