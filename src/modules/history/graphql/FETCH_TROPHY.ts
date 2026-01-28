import { gql } from '@apollo/client';

export const FETCH_TROPHY = gql`
  query FETCH_TROPHY($trophyId: String!) {
    trophy: FETCH_TROPHY(trophyId: $trophyId) {
      _id
      name
      season
      opponent
      year
      isFinal
      isWinner
      comment
    }
  }
`;
