import { TypedDocumentNode, gql } from '@apollo/client';
import { StreakTypes } from '../types';

export const FETCH_PLAYER_STREAKS: TypedDocumentNode<{
  streaks: StreakTypes;
}> = gql`
  query FetchPlayerStreaks($playerId: String!, $teamId: String!) {
    streaks: playerStreaks(playerId: $playerId, teamId: $teamId) {
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
