import { gql } from '@apollo/client';

export const FETCH_ORGS_BY_USER = gql`
  query FETCH_ORGS_BY_USER {
    orgs: USER_ORGANIZATIONS {
      _id
      name
      badge {
        public_id
        url
      }
    }
  }
`;
