import { TypedDocumentNode, gql } from '@apollo/client';
import {IMatchList} from "../../../types/matchList.ts";

export const GET_MATCHES_BY_SEASON: TypedDocumentNode<{
  matches: IMatchList[];
}> = gql`
  query GetMatchesBySeason(
    $limit: Float!
    $offset: Float!
    $teamId: String!
    $seasonId: String!
  ) {
    matches: matchesBySeason(
      teamId: $teamId
      seasonId: $seasonId
      limit: $limit
      offset: $offset
    ) {
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
