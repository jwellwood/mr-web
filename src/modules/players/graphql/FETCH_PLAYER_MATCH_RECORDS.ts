import { gql } from '@apollo/client';

export const FETCH_PLAYER_MATCH_RECORDS = gql`
  query FETCH_PLAYER_MATCH_RECORDS($teamId: String!, $playerId: String!) {
    stats: PLAYER_MATCH_RECORDS(teamId: $teamId, playerId: $playerId) {
      maxGoals
      maxAssists
      maxCombined
    }
  }
`;
