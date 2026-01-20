import { TypedDocumentNode, gql } from '@apollo/client';
import { IPlayer } from '../../players/types';

export const FETCH_SQUAD_BY_SEASON: TypedDocumentNode<{
  players: IPlayer[];
}> = gql`
  query FETCH_SQUAD_BY_SEASON($teamId: String!, $seasonId: String!) {
    players: SQUAD_BY_SEASON(teamId: $teamId, seasonId: $seasonId) {
      _id
      name
      position
    }
  }
`;
