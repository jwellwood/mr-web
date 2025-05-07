import { TypedDocumentNode, gql } from '@apollo/client';
import { IPlayer } from 'types';

export const GET_PLAYERS_BY_SEASON_ID: TypedDocumentNode<{
  players: IPlayer[];
}> = gql`
  query GetPlayersBySeasonId($teamId: String!, $seasonId: String!) {
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
