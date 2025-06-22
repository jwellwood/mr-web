import { TypedDocumentNode, gql } from '@apollo/client';
import { ITrophyResponse } from '../../types';

export const GET_TROPHIES: TypedDocumentNode<{
  trophies: ITrophyResponse[];
}> = gql`
  query GetTrophies($teamId: String!) {
    trophies: trophiesByTeam(teamId: $teamId) {
      _id
      name
      season
      isWinner
      isFinal
      year
    }
  }
`;
