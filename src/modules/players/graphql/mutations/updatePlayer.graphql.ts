import { TypedDocumentNode, gql } from '@apollo/client';
import { IPlayer } from 'types';

export const UPDATE_PLAYER: TypedDocumentNode<{
  player: IPlayer;
}> = gql`
  mutation UpdatePlayer(
    $teamId: String!
    $playerId: String!
    $name: String!
    $dateOfBirth: String!
    $nationality: String!
    $squadNumber: String!
    $position: String!
    $yearJoined: String!
    $isActive: Boolean!
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
        isActive: $isActive
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
