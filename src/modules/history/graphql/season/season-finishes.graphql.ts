import { TypedDocumentNode, gql } from '@apollo/client';
import { ILeaguePositions } from '../../types';

export const GET_POSITION_FINISHES: TypedDocumentNode<{
  position: ILeaguePositions[];
}> = gql`
  query GetPositionFinishes($teamId: String!) {
    position: positionFinishes(teamId: $teamId) {
      seasonId
      name
      position
      totalFinalPositions
      division
    }
  }
`;
