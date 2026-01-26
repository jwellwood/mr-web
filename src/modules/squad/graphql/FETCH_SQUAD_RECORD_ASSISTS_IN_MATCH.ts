import { gql } from '@apollo/client';

export const FETCH_SQUAD_RECORD_ASSISTS_IN_MATCH = gql`
  query FETCH_SQUAD_RECORD_ASSISTS_IN_MATCH($teamId: String!) {
    stats: SQUAD_RECORD_ASSISTS_IN_MATCH(teamId: $teamId) {
      player
      total
      date
      opponentName
      opponentGoals
      teamGoals
      matchId
    }
  }
`;
