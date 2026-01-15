import { TypedDocumentNode, gql } from '@apollo/client';
import { ITeamSeason } from '../types';

export const FETCH_SEASONS: TypedDocumentNode<{
  seasons: ITeamSeason[];
}> = gql`
  query FETCH_SEASONS($teamId: String!) {
    seasons: FETCH_SEASONS(teamId: $teamId) {
      _id
      name
      yearStarted
      yearEnded
      leaguePosition
      totalFinalPositions
      division
    }
  }
`;
