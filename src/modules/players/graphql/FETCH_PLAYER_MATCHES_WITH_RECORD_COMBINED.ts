import { TypedDocumentNode, gql } from '@apollo/client';
import { IPlayerRecordMatches } from '../../matches/types';

export const FETCH_PLAYER_MATCHES_WITH_RECORD_COMBINED: TypedDocumentNode<{
  stats: IPlayerRecordMatches[];
}> = gql`
  query FETCH_PLAYER_MATCHES_WITH_RECORD_COMBINED(
    $teamId: String!
    $playerId: String!
    $record: Float!
  ) {
    stats: PLAYER_MATCHES_WITH_RECORD_COMBINED(
      teamId: $teamId
      playerId: $playerId
      record: $record
    ) {
      teamGoals
      opponentGoals
      opponent
      date
      _id
    }
  }
`;
