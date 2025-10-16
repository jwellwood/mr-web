import { TypedDocumentNode, gql } from '@apollo/client';
import { AllPlayerStreaks } from '../../types';

export const FETCH_ALL_PLAYER_STREAKS: TypedDocumentNode<{
  streaks: AllPlayerStreaks[];
}> = gql`
  query FetchAllPlayerStreaks($teamId: String!) {
    streaks: allPlayerPlayedStreaks(teamId: $teamId) {
      playerId
      longestPlayedStreak
    }
  }
`;
