import { TypedDocumentNode, gql } from '@apollo/client';

import { IUser } from '../../../types';
export const LOG_OUT_USER: TypedDocumentNode<{ user: IUser }> = gql`
  mutation LogOutUser {
    user: logOutUser {
      _id
    }
  }
`;
