import { gql } from '@apollo/client';

export const FETCH_SEASON = gql`
  query FETCH_SEASON($seasonId: String!) {
    season: FETCH_SEASON(seasonId: $seasonId) {
      _id
      name
      yearStarted
      yearEnded
      leaguePosition
      totalFinalPositions
      division
      comment
    }
  }
`;
