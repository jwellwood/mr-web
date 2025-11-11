import { TypedDocumentNode, gql } from '@apollo/client';
import { ITrophyResponse } from '../types';

export const FETCH_TROPHIES: TypedDocumentNode<{
  trophies: ITrophyResponse[];
}> = gql`
  query FETCH_TROPHIES($teamId: String!) {
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
