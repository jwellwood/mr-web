import { gql } from '@apollo/client';

export const FETCH_MATCHES_BY_OPPONENT = gql`
  query FETCH_MATCHES_BY_OPPONENT($teamId: String!, $opponentId: String!) {
    matches: FETCH_MATCHES_BY_OPPONENT(teamId: $teamId, opponentId: $opponentId) {
      _id
      date
      isHome
      competition
      teamName
      opponentGoals
      teamGoals
      opponentName
    }
  }
`;
