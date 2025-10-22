import { TypedDocumentNode, gql } from '@apollo/client';
import { IPlayer } from '../../../types';

export const FETCH_PLAYER: TypedDocumentNode<{
  player: IPlayer;
}> = gql`
  query FetchPlayer($playerId: String!) {
    player: playerById(playerId: $playerId) {
      _id
      name
      position
      squadNumber
      position
      nationality
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
