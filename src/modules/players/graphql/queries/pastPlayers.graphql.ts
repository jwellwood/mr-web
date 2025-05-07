import { TypedDocumentNode, gql } from '@apollo/client';
import { IPastPlayer } from 'types/IPastPlayer';

export const GET_PAST_PLAYERS: TypedDocumentNode<{
  players: IPastPlayer[];
}> = gql`
  query GetPastPlayers($teamId: String!) {
    players: pastPlayers(teamId: $teamId) {
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
