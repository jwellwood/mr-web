import { TypedDocumentNode, gql } from '@apollo/client';
import { IAward } from '../../types';

export const GET_SEASON_AWARDS: TypedDocumentNode<{
  awards: IAward[];
}> = gql`
  query GetSeasonAwards($seasonId: String!) {
    awards: awardsBySeason(seasonId: $seasonId) {
      _id
      awardName
      winners {
        name
        _id
      }
      awardValue
      comment
    }
  }
`;
