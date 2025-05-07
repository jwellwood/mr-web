import { TypedDocumentNode, gql } from '@apollo/client';

export const GET_SQUAD_LIST_SEASON_STATS: TypedDocumentNode<{
  players: any[];
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
