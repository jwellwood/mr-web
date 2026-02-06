import { gql } from '@apollo/client';

export const FETCH_MATCHES_STREAK = gql`
  query FETCH_MATCHES_STREAKS($teamId: String!) {
    streaks: MATCHES_STREAKS(teamId: $teamId) {
      longestWinStreak {
        length
        startDate
        endDate
      }
      longestUnbeatenStreak {
        length
        startDate
        endDate
      }
      longestLossStreak {
        length
        startDate
        endDate
      }
      longestWinlessStreak {
        length
        startDate
        endDate
      }
    }
  }
`;
