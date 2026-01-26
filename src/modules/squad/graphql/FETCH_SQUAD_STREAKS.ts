import { gql } from '@apollo/client';

export const FETCH_SQUAD_STREAKS = gql`
  query FETCH_SQUAD_STREAKS($teamId: String!) {
    streaks: SQUAD_STREAKS(teamId: $teamId) {
      playerId
      longestPlayedStreak
    }
  }
`;
