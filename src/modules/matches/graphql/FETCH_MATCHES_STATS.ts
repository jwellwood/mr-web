import { TypedDocumentNode, gql } from '@apollo/client';
import { IMatchStats } from '../types';

export const FETCH_MATCHES_STATS: TypedDocumentNode<{
  stats: IMatchStats;
}> = gql`
  query FETCH_MATCHES_STATS($teamId: String!, $seasonId: String!) {
    stats: FETCH_MATCHES_STATS(teamId: $teamId, seasonId: $seasonId) {
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
