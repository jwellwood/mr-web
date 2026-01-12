import { TypedDocumentNode, gql } from '@apollo/client';
import { IOpponentTable } from '../types';

export const FETCH_MATCH_OPPONENTS: TypedDocumentNode<{
  stats: IOpponentTable[];
}> = gql`
  query FETCH_MATCH_OPPONENTS($teamId: String!) {
    stats: FETCH_MATCH_OPPONENTS(teamId: $teamId) {
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
