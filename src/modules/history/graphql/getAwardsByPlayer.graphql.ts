import { TypedDocumentNode, gql } from '@apollo/client';
import { IAwardByPlayer } from '../types';

export const GET_AWARDS_BY_PLAYER: TypedDocumentNode<{
  awards: IAwardByPlayer[];
}> = gql`
  query GetAwardsByPlayer($playerId: String!) {
    awards: awardsByPlayer(playerId: $playerId) {
      _id
      season
      awardName
      awardValue
      comment
    }
  }
`;
