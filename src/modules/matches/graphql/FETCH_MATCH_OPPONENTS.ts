import { gql } from '@apollo/client';

export const FETCH_MATCH_OPPONENTS = gql`
  query FETCH_MATCH_OPPONENTS(
    $teamId: String!
    $showAllTeams: Boolean!
    $includeForfeits: Boolean!
  ) {
    stats: MATCH_OPPONENTS(
      teamId: $teamId
      showAllTeams: $showAllTeams
      includeForfeits: $includeForfeits
    ) {
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
