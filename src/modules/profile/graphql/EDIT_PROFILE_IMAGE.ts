import { TypedDocumentNode, gql } from '@apollo/client';
import { IUser } from '../../auth/types';

export const EDIT_PROFILE_IMAGE: TypedDocumentNode<{
  user: IUser;
}> = gql`
  mutation EditProfileImage($public_id: String!, $url: String!) {
    editProfileImage(data: { public_id: $public_id, url: $url }) {
      _id
      image {
        public_id
        url
      }
    }
  }
`;
