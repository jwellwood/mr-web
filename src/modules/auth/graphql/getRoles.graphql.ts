import { TypedDocumentNode, gql } from '@apollo/client';

import { IUser } from 'types';

export const GET_ROLES: TypedDocumentNode<{
  user: IUser;
}> = gql`
  query GetRoles {
    user {
      _id
      roles
      teamIds
      orgIds
    }
  }
`;
