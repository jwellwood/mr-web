import { gql } from '@apollo/client';

export const EDIT_PROFILE_IMAGE = gql`
  mutation EDIT_PROFILE_IMAGE($public_id: String!, $url: String!) {
    EDIT_PROFILE_IMAGE(data: { public_id: $public_id, url: $url }) {
      _id
      image {
        public_id
        url
      }
    }
  }
`;
