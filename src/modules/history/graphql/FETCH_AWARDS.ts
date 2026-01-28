import { gql } from '@apollo/client';

export const FETCH_AWARDS = gql`
  query FETCH_AWARDS($seasonId: String!) {
    awards: FETCH_AWARDS(seasonId: $seasonId) {
      _id
      awardName
      winners {
        name
        _id
      }
      awardValue
      comment
    }
  }
`;
