import { TypedDocumentNode, gql } from '@apollo/client';
import { IMatchList } from '../types';

export const FETCH_MATCHES: TypedDocumentNode<{
  matches: IMatchList[];
}> = gql`
  query FETCH_MATCHES($teamId: String!, $seasonId: String!) {
    matches: FETCH_MATCHES(teamId: $teamId, seasonId: $seasonId) {
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
