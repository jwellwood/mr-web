import { TypedDocumentNode, gql } from '@apollo/client';
import { IPlayerMatchRecords } from '../../matches/types';

export const FETCH_PLAYER_MATCH_RECORDS: TypedDocumentNode<{
  stats: IPlayerMatchRecords;
}> = gql`
  query FETCH_PLAYER_MATCH_RECORDS($teamId: String!, $playerId: String!) {
    stats: PLAYER_MATCH_RECORDS(teamId: $teamId, playerId: $playerId) {
      maxGoals
      maxAssists
      maxCombined
    }
  }
`;
