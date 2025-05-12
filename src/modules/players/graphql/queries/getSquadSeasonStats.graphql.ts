import { TypedDocumentNode, gql } from '@apollo/client';

import { IPlayerInMatch } from '../../../../types';

export const GET_SQUAD_LIST_SEASON_STATS: TypedDocumentNode<{
  players: IPlayerInMatch[];
}> = gql`
  query GetSquadSeasonStats($teamId: String!, $seasonId: String!) {
    players: playersSeasonStats(teamId: $teamId, seasonId: $seasonId) {
      _id
      apps
      goals
      assists
    }
  }
`;
