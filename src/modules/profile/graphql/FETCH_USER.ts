import { gql } from '@apollo/client';

export const FETCH_USER = gql`
  query FETCH_USER {
    user: FETCH_USER {
      _id
      isVerified
      username
      email
      roles
      teamIds
      orgIds
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
