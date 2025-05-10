import { TypedDocumentNode, gql } from '@apollo/client';
import { IMostGoalsInMatch } from '../../../../types';
export const GET_MOST_GOALS_IN_MATCH: TypedDocumentNode<{
  stats: IMostGoalsInMatch[];
}> = gql`
  query GetMostGoalsInMatch($teamId: String!) {
    stats: mostGoalsInGame(teamId: $teamId) {
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

export const GET_MOST_ASSISTS_IN_MATCH: TypedDocumentNode<{
  assistStats: IMostGoalsInMatch[];
}> = gql`
  query GetMostGoalsInMatch($teamId: String!) {
    assistStats: mostAssistsInGame(teamId: $teamId) {
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
