import { TypedDocumentNode, gql } from '@apollo/client';
import { IMatchList } from '../../../types/matchList.ts';

export const FETCH_MATCHES_BY_OPPONENT: TypedDocumentNode<{
  matches: IMatchList[];
}> = gql`
  query FETCH_MATCHES_BY_OPPONENT($teamId: String!, $opponentId: String!) {
    matches: matchesByOpponent(teamId: $teamId, opponentId: $opponentId) {
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
