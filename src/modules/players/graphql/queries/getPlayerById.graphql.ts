import { TypedDocumentNode, gql } from '@apollo/client';
import {IPlayer} from "../../../../types";

export const GET_PLAYER_BY_ID: TypedDocumentNode<{
  player: IPlayer;
}> = gql`
  query GetPlayerById($playerId: String!) {
    player: playerById(playerId: $playerId) {
      _id
      name
      position
      squadNumber
      position
      nationality
      isActive
      isCaptain
      isViceCaptain
      isHallOfFame
      dateOfBirth
      yearJoined
      seasonIds {
        _id
        name
      }
      image {
        url
      }
    }
  }
`;
