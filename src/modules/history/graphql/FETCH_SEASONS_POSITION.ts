import { TypedDocumentNode, gql } from '@apollo/client';
import { ILeaguePositions } from '../types';

export const FETCH_SEASONS_POSITION: TypedDocumentNode<{
  position: ILeaguePositions[];
}> = gql`
  query FETCH_SEASONS_POSITION($teamId: String!) {
    position: FETCH_SEASONS_POSITION(teamId: $teamId) {
      seasonId
      name
      position
      totalFinalPositions
      division
    }
  }
`;
