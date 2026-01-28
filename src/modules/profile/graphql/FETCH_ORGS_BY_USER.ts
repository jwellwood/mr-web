import { gql } from '@apollo/client';

export const FETCH_ORGS_BY_USER = gql`
  query FETCH_ORGS_BY_USER {
    orgs: userOrganizations {
      _id
      name
      badge {
        public_id
        url
      }
    }
  }
`;
