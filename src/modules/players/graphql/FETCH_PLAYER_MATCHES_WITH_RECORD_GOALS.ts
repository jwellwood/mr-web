import { TypedDocumentNode, gql } from '@apollo/client';
import { IPlayerRecordMatches } from '../../matches/types';

export const FETCH_PLAYER_MATCHES_WITH_RECORD_GOALS: TypedDocumentNode<{
  stats: IPlayerRecordMatches[];
}> = gql`
  query FETCH_PLAYER_MATCHES_WITH_RECORD_GOALS(
    $teamId: String!
    $playerId: String!
    $record: Float!
  ) {
    stats: PLAYER_MATCHES_WITH_RECORD_GOALS(teamId: $teamId, playerId: $playerId, record: $record) {
      teamGoals
      opponentGoals
      opponent
      date
      _id
    }
  }
`;
