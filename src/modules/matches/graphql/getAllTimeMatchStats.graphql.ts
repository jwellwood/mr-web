import { TypedDocumentNode, gql } from '@apollo/client';
import { IMatchStats } from 'types';

export const GET_ALL_TIME_MATCH_STATS: TypedDocumentNode<{
  stats: IMatchStats;
}> = gql`
  query GetAllTimeMatchStats($teamId: String!) {
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
