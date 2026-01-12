import { gql, TypedDocumentNode } from '@apollo/client';
import { IMatchRecords } from '../types';

export const FETCH_MATCHES_RECORDS: TypedDocumentNode<{
  stats: IMatchRecords;
}> = gql`
  query FETCH_MATCHES_RECORDS($teamId: String!) {
    stats: FETCH_MATCHES_RECORDS(teamId: $teamId) {
      maxDiff {
        _id
        teamGoals
        opponentGoals
        date
        isHome
        opponentName
      }
      minDiff {
        _id
        teamGoals
        opponentGoals
        date
        isHome
        opponentName
      }
      maxGoals {
        _id
        teamGoals
        opponentGoals
        date
        isHome
        opponentName
      }
      maxConceded {
        _id
        teamGoals
        opponentGoals
        date
        isHome
        opponentName
      }
    }
  }
`;
