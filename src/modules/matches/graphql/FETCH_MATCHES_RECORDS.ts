import { gql, TypedDocumentNode } from '@apollo/client';
import { IMostMatch } from '../types';

export const FETCH_MATCHES_RECORDS: TypedDocumentNode<{
  stats: {
    maxDiff: IMostMatch[];
    minDiff: IMostMatch[];
    maxGoals: IMostMatch[];
    maxConceded: IMostMatch[];
  };
}> = gql`
  query FETCH_MATCHES_RECORDS($teamId: String!) {
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
