import { TypedDocumentNode, gql } from '@apollo/client';
import { IPlayer } from 'types';

export const GET_HALL_OF_FAME: TypedDocumentNode<{
  players: IPlayer[];
}> = gql`
  query GetHallOfFame($teamId: String!) {
    players: hallOfFamePlayers(teamId: $teamId) {
      _id
      name
      squadNumber
      nationality
      yearJoined
      position
      image {
        public_id
        url
      }
    }
  }
`;
