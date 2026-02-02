import { gql } from '@apollo/client';

export const FETCH_MATCHES = gql`
  query FETCH_MATCHES($teamId: String!, $seasonId: String!) {
    matches: MATCHES(teamId: $teamId, seasonId: $seasonId) {
      _id
      date
      isHome
      competition
      teamName
      opponentGoals
      teamGoals
      opponentBadge
      opponentName
      isForfeit
    }
  }
`;
