import { TypedDocumentNode, gql } from '@apollo/client';
import { IOrgSeason } from '../types';

export const FETCH_ORG_SEASON: TypedDocumentNode<{
  orgSeason: IOrgSeason;
}> = gql`
  query FETCH_ORG_SEASON($seasonId: String!) {
    orgSeason: orgSeasonById(seasonId: $seasonId) {
      _id
      name
      yearStarted
      yearEnded
      isCurrent
      comment
    }
  }
`;
