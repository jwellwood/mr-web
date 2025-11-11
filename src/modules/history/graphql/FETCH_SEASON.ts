import { TypedDocumentNode, gql } from '@apollo/client';
import { ITeamSeason } from '../types';

export const FETCH_SEASON: TypedDocumentNode<{
  season: ITeamSeason;
}> = gql`
  query FETCH_SEASON($seasonId: String!) {
    season: teamSeasonById(seasonId: $seasonId) {
      _id
      name
      yearStarted
      yearEnded
      leaguePosition
      totalFinalPositions
      division
      comment
    }
  }
`;
