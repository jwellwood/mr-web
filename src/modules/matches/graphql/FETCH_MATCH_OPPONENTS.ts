import { gql } from '@apollo/client';

export const FETCH_MATCH_OPPONENTS = gql`
  query FETCH_MATCH_OPPONENTS($teamId: String!) {
    stats: FETCH_MATCH_OPPONENTS(teamId: $teamId) {
      _id
      isActive
      opponentName
      opponentBadge
      total
      wins
      draws
      losses
      totalGoalsScored
      totalGoalsConceded
      totalGoalDifference
    }
  }
`;
