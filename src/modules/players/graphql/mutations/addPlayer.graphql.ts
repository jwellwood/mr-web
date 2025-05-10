import { TypedDocumentNode, gql } from '@apollo/client';
import { IPlayer } from '../../../../types';
export const ADD_PLAYER: TypedDocumentNode<{
  player: IPlayer;
}> = gql`
  mutation AddPlayer(
    $teamId: String!
    $name: String!
    $nationality: String!
    $dateOfBirth: String!
    $position: String!
    $squadNumber: String!
    $yearJoined: String!
    $isActive: Boolean!
    $isCaptain: Boolean!
    $isViceCaptain: Boolean!
    $isHallOfFame: Boolean!
    $seasonIds: [String!]!
  ) {
    player: addPlayer(
      teamId: $teamId
      data: {
        name: $name
        nationality: $nationality
        dateOfBirth: $dateOfBirth
        position: $position
        squadNumber: $squadNumber
        yearJoined: $yearJoined
        isActive: $isActive
        isCaptain: $isCaptain
        isViceCaptain: $isViceCaptain
        isHallOfFame: $isHallOfFame
        seasonIds: $seasonIds
      }
    ) {
      _id
    }
  }
`;
