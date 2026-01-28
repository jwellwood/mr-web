import { gql } from '@apollo/client';

export const FETCH_AWARD = gql`
  query FETCH_AWARD($awardId: String!) {
    award: FETCH_AWARD(awardId: $awardId) {
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
