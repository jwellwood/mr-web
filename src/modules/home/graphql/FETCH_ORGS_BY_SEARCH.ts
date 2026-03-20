import { gql } from '@apollo/client';

export const FETCH_ORGS_BY_SEARCH = gql`
  query FETCH_ORGS_BY_SEARCH($filter: String!) {
    orgs: FETCH_ORGS_BY_SEARCH(filter: $filter) {
      _id
      name
      city
      country
      badge {
        url
        public_id
      }
    }
  }
`;
