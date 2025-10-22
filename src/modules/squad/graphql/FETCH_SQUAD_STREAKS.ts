import { TypedDocumentNode, gql } from '@apollo/client';
import { AllPlayerStreaks } from '../../players/types';

export const FETCH_SQUAD_STREAKS: TypedDocumentNode<{
  streaks: AllPlayerStreaks[];
}> = gql`
  query FETCH_SQUAD_STREAKS($teamId: String!) {
    streaks: allPlayerPlayedStreaks(teamId: $teamId) {
      playerId
      longestPlayedStreak
    }
  }
`;
