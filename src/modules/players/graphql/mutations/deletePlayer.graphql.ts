import { TypedDocumentNode, gql } from '@apollo/client';
import { IPlayer } from '../../../../types';
export const DELETE_PLAYER: TypedDocumentNode<{
  player: IPlayer;
}> = gql`
  mutation DeletePlayer($teamId: String!, $playerId: String!) {
    deletePlayer(teamId: $teamId, playerId: $playerId) {
      _id
    }
  }
`;
