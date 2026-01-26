import { gql } from '@apollo/client';

export const FETCH_PLAYER_SEASONS_SUMMARY = gql`
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
