import { TypedDocumentNode, gql } from '@apollo/client';
import { IAward } from '../types';

export const FETCH_AWARDS: TypedDocumentNode<{
  awards: IAward[];
}> = gql`
  query FETCH_AWARDS($seasonId: String!) {
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
