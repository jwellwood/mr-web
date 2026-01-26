import { gql } from '@apollo/client';

export const FETCH_PLAYER_MATCHES_WITH_RECORD_ASSISTS = gql`
  query FETCH_PLAYER_MATCHES_WITH_RECORD_ASSISTS(
    $teamId: String!
    $playerId: String!
    $record: Float!
  ) {
    stats: PLAYER_MATCHES_WITH_RECORD_ASSISTS(
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
