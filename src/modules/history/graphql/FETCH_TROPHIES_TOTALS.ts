import { TypedDocumentNode, gql } from '@apollo/client';
import { ITrophyTotals } from '../types';

export const FETCH_TROPHIES_TOTALS: TypedDocumentNode<{
  trophyTotals: ITrophyTotals;
}> = gql`
  query FETCH_TROPHIES_TOTALS($teamId: String!) {
    trophyTotals(teamId: $teamId) {
      _id
      total
      winner
      final
    }
  }
`;
