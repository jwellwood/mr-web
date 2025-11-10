import { TypedDocumentNode, gql } from '@apollo/client';
import { IMatchStats } from '../../../types';
export const FETCH_MATCHES_ALL_TIME_STATS: TypedDocumentNode<{
  stats: IMatchStats;
}> = gql`
  query FETCH_MATCHES_ALL_TIME_STATS($teamId: String!) {
    stats: allTimeMatchStats(teamId: $teamId) {
      total
      wins
      draws
      defeats
      scored
      conceded
      teamAvg
      oppAvg
      difference
    }
  }
`;
