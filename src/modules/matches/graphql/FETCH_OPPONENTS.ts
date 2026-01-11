import { TypedDocumentNode, gql } from '@apollo/client';
import { IOpponentTable } from '../types';

export const FETCH_OPPONENTS: TypedDocumentNode<{
  stats: IOpponentTable[];
}> = gql`
  query FETCH_OPPONENTS($teamId: String!) {
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
