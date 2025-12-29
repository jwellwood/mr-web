import { TypedDocumentNode, gql } from '@apollo/client';
import { IAwardByPlayer } from '../../history/types';

export const FETCH_AWARDS_BY_PLAYER: TypedDocumentNode<{
  awards: IAwardByPlayer[];
}> = gql`
  query FETCH_AWARDS_BY_PLAYER($playerId: String!) {
    awards: awardsByPlayer(playerId: $playerId) {
      _id
      season
      awardName
      awardValue
      comment
    }
  }
`;
