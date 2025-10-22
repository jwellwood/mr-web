import { TypedDocumentNode, gql } from '@apollo/client';
import { IPlayer } from '../../../types';
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
