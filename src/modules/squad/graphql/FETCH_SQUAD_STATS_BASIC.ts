import { TypedDocumentNode, gql } from '@apollo/client';
import { IPlayerInMatch } from '../../matches/types';

export const FETCH_SQUAD_STATS_BASIC: TypedDocumentNode<{
  players: IPlayerInMatch[];
}> = gql`
  query FETCH_SQUAD_STATS_BASIC($teamId: String!, $seasonId: String!) {
    players: playersSeasonStats(teamId: $teamId, seasonId: $seasonId) {
      _id
      apps
      goals
      assists
    }
  }
`;
