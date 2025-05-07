import { TypedDocumentNode, gql } from '@apollo/client';
import { IOpponentTable } from 'types';

export const GET_OPPONENT_TABLE: TypedDocumentNode<{
  stats: IOpponentTable;
}> = gql`
  query GetOpponentTableStats($teamId: String!) {
    stats: opponentTable(teamId: $teamId) {
      _id
      isActive
      opponentName
      opponentBadge
      total
      wins
      draws
      losses
      totalGoalsScored
      totalGoalsConceded
      totalGoalDifference
    }
  }
`;
