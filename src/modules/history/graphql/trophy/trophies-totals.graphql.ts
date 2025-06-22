import { TypedDocumentNode, gql } from '@apollo/client';
import { ITrophyTotals } from '../../types';

export const GET_TROPHIES_TOTALS: TypedDocumentNode<{
  trophyTotals: ITrophyTotals;
}> = gql`
  query GetTrophiesTotals($teamId: String!) {
    trophyTotals(teamId: $teamId) {
      _id
      total
      winner
      final
    }
  }
`;
