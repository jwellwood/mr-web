import { TypedDocumentNode, gql } from '@apollo/client';
import { IPastPlayer } from '../types';

export const FETCH_PAST_PLAYERS: TypedDocumentNode<{
  players: IPastPlayer[];
}> = gql`
  query FETCH_PAST_PLAYERS($teamId: String!, $seasonId: String!) {
    players: pastPlayers(teamId: $teamId, seasonId: $seasonId) {
      _id
      name
      nationality
      joined
      left
      seasons
      position
      image
    }
  }
`;
