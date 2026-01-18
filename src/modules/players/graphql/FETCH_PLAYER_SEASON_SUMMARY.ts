import { TypedDocumentNode, gql } from '@apollo/client';
import { IPlayerSeasonsSummary } from '../types';

export const FETCH_PLAYER_SEASONS_SUMMARY: TypedDocumentNode<{
  seasons: IPlayerSeasonsSummary[];
}> = gql`
  query FETCH_PLAYER_SEASONS_SUMMARY($playerId: String!) {
    seasons: PLAYER_SEASONS_SUMMARY(playerId: $playerId) {
      seasonName
      seasonId
      apps
      goals
      assists
    }
  }
`;
