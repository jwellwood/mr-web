import { gql } from '@apollo/client';

export const FETCH_MATCHES_RECORDS = gql`
  query FETCH_MATCHES_RECORDS($teamId: String!) {
    stats: MATCHES_RECORDS(teamId: $teamId) {
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
