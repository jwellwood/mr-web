import { TypedDocumentNode, gql } from '@apollo/client';
import { IUser } from '../../../types';

export const FETCH_ROLES: TypedDocumentNode<{
  user: IUser;
}> = gql`
  query FetchRoles {
    user {
      _id
      roles
      teamIds
      orgIds
    }
  }
`;
