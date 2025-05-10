import { TypedDocumentNode, gql } from '@apollo/client';
import { IPlayer } from '../../../../types';
export const GET_PLAYERS_BY_TEAM_ID: TypedDocumentNode<{
  players: IPlayer[];
}> = gql`
  query GetPlayersByTeamId($teamId: String!) {
    players: playersByTeam(teamId: $teamId) {
      _id
      name
      position
      squadNumber
      image {
        url
      }
    }
  }
`;
