import { gql } from '@apollo/client';

export const FETCH_TOP_PLAYER_STREAKS = gql`
  query FETCH_TOP_PLAYER_STREAKS($teamId: String!, $sortBy: String!) {
    streaks: TOP_PLAYER_STREAKS(teamId: $teamId, sortBy: $sortBy) {
      playerId
      playerName
      played
      goals
      assists
      combined
    }
  }
`;
