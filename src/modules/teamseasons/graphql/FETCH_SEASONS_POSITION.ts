import { gql } from '@apollo/client';

export const FETCH_SEASONS_POSITION = gql`
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
