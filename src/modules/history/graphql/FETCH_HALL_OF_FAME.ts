import { TypedDocumentNode, gql } from '@apollo/client';
import { IPlayer } from '../../players/types';

export const FETCH_HALL_OF_FAME: TypedDocumentNode<{
  players: IPlayer[];
}> = gql`
  query FETCH_HALL_OF_FAME($teamId: String!) {
    players: HALL_OF_FAME_PLAYERS(teamId: $teamId) {
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
