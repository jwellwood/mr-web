import { TypedDocumentNode, gql } from '@apollo/client';
import { IPlayer } from '../types';

export const EDIT_PLAYER: TypedDocumentNode<{
  player: IPlayer;
}> = gql`
  mutation EDIT_PLAYER(
    $teamId: String!
    $playerId: String!
    $name: String!
    $dateOfBirth: String!
    $nationality: String!
    $squadNumber: String!
    $position: String!
    $yearJoined: String!
    $isCaptain: Boolean!
    $isViceCaptain: Boolean!
    $isHallOfFame: Boolean!
    $seasonIds: [String!]!
  ) {
    updatePlayer(
      teamId: $teamId
      playerId: $playerId
      data: {
        name: $name
        dateOfBirth: $dateOfBirth
        nationality: $nationality
        squadNumber: $squadNumber
        position: $position
        yearJoined: $yearJoined
        isCaptain: $isCaptain
        isViceCaptain: $isViceCaptain
        isHallOfFame: $isHallOfFame
        seasonIds: $seasonIds
      }
    ) {
      _id
      name
    }
  }
`;
