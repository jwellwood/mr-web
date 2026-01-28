import { gql } from '@apollo/client';

export const FETCH_SEASONS = gql`
  query FETCH_SEASONS($teamId: String!) {
    seasons: FETCH_SEASONS(teamId: $teamId) {
      _id
      name
      yearStarted
      yearEnded
      leaguePosition
      totalFinalPositions
      division
    }
  }
`;
