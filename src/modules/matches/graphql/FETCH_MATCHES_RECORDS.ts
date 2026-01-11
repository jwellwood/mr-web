import { gql, TypedDocumentNode } from '@apollo/client';
import { IMatchRecords } from '../types';

export const FETCH_MATCHES_RECORDS: TypedDocumentNode<{
  stats: IMatchRecords;
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
