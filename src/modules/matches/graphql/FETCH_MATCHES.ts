import { TypedDocumentNode, gql } from '@apollo/client';
import { IMatchList } from '../types';

export const FETCH_MATCHES: TypedDocumentNode<{
  matches: IMatchList[];
}> = gql`
  query FETCH_MATCHES($limit: Float!, $offset: Float!, $teamId: String!, $seasonId: String!) {
    matches: matchesBySeason(teamId: $teamId, seasonId: $seasonId, limit: $limit, offset: $offset) {
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
