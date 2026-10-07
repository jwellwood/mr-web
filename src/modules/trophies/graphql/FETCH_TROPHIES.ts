import { gql } from '@apollo/client';

export const FETCH_TROPHIES = gql`
  query FETCH_TROPHIES($teamId: String!) {
    trophies: FETCH_TROPHIES(teamId: $teamId) {
      _id
      orgTrophyId
      name
      season
      isWinner
      isFinal
      year
    }
  }
`;
