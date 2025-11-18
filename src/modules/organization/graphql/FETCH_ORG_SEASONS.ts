import { TypedDocumentNode, gql } from '@apollo/client';
import { IOrgSeason } from '../types';

export const FETCH_ORG_SEASONS: TypedDocumentNode<{
  orgSeasons: IOrgSeason[];
}> = gql`
  query FETCH_ORG_SEASONS($orgId: String!) {
    orgSeasons: orgSeasons(orgId: $orgId) {
      _id
      name
      yearStarted
      yearEnded
      isCurrent
      comment
    }
  }
`;
