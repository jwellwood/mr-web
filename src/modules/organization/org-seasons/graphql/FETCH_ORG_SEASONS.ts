import { gql } from '@apollo/client';

export const FETCH_ORG_SEASONS = gql`
  query FETCH_ORG_SEASONS($orgId: String!) {
    orgSeasons: ORG_SEASONS(orgId: $orgId) {
      _id
      name
      yearStarted
      yearEnded
      isCurrent
      comment
    }
  }
`;
