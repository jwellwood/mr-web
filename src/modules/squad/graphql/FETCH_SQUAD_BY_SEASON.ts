import { TypedDocumentNode, gql } from '@apollo/client';
import { IPlayer } from '../../../types';

export const FETCH_SQUAD_BY_SEASON: TypedDocumentNode<{
  players: IPlayer[];
}> = gql`
  query FETCH_SQUAD_BY_SEASON($teamId: String!, $seasonId: String!) {
    players: playersBySeason(teamId: $teamId, seasonId: $seasonId) {
      _id
      name
      position
      nationality
      squadNumber
      dateOfBirth
      image {
        public_id
        url
      }
    }
  }
`;
