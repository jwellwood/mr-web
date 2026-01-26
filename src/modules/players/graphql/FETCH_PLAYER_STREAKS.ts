import { gql } from '@apollo/client';

export const FETCH_PLAYER_STREAKS = gql`
  query FETCH_PLAYER_STREAKS($playerId: String!, $teamId: String!) {
    streaks: PLAYER_STREAKS(playerId: $playerId, teamId: $teamId) {
      currentPlayedStreak {
        length
        startDate
        endDate
      }
      currentGoalStreak {
        length
        startDate
        endDate
      }
      currentAssistStreak {
        length
        startDate
        endDate
      }
      currentContributionStreak {
        length
        startDate
        endDate
      }
      playedStreak {
        length
        startDate
        endDate
      }
      goalStreak {
        length
        startDate
        endDate
      }
      assistStreak {
        length
        startDate
        endDate
      }
      contributionStreak {
        length
        startDate
        endDate
      }
    }
  }
`;
