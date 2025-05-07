import { TypedDocumentNode, gql } from '@apollo/client';
import { IMatchStats, IMostMatch } from 'types';

export const GET_MATCH_STATS: TypedDocumentNode<{
  stats: IMatchStats;
}> = gql`
  query GetMatchStats($teamId: String!, $seasonId: String!) {
    stats: matchStats(teamId: $teamId, seasonId: $seasonId) {
      total
      wins
      draws
      defeats
      scored
      conceded
      teamAvg
      oppAvg
      difference
    }
  }
`;

export const GET_MATCH_STATS_MOST: TypedDocumentNode<{
  stats: {
    maxDiff: IMostMatch[];
    minDiff: IMostMatch[];
    maxGoals: IMostMatch[];
    maxConceded: IMostMatch[];
  };
}> = gql`
  query GetMatchStats($teamId: String!) {
    stats: highLowStats(teamId: $teamId) {
      maxDiff {
        _id
        teamGoals
        opponentGoals
        date
        isHome
        opponent
      }
      minDiff {
        _id
        teamGoals
        opponentGoals
        date
        isHome
        opponent
      }
      maxGoals {
        _id
        teamGoals
        opponentGoals
        date
        isHome
        opponent
      }
      maxConceded {
        _id
        teamGoals
        opponentGoals
        date
        isHome
        opponent
      }
    }
  }
`;
