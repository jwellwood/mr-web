import { gql } from '@apollo/client';

export const FETCH_ORG_SEASON = gql`
  query FETCH_ORG_SEASON($seasonId: String!) {
    orgSeason: ORG_SEASON(seasonId: $seasonId) {
      _id
      name
      yearStarted
      yearEnded
      isCurrent
      comment
    }
  }
`;
