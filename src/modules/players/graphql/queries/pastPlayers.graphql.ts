import { TypedDocumentNode, gql } from '@apollo/client';
import { IPastPlayer } from '../../../../types/pastPlayer.ts';

export const GET_PAST_PLAYERS: TypedDocumentNode<{
  players: IPastPlayer[];
}> = gql`
  query GetPastPlayers($teamId: String!, $seasonId: String!) {
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
