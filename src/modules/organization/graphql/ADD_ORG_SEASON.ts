import { IOrgSeason } from './../types';
import { TypedDocumentNode, gql } from '@apollo/client';

export const ADD_ORG_SEASON: TypedDocumentNode<{
  season: IOrgSeason;
}> = gql`
  mutation ADD_ORG_SEASON(
    $orgId: String!
    $yearStarted: String!
    $yearEnded: String!
    $isCurrent: Boolean!
    $comment: String
  ) {
    season: addOrgSeason(
      orgId: $orgId
      data: {
        yearStarted: $yearStarted
        yearEnded: $yearEnded
        isCurrent: $isCurrent
        comment: $comment
      }
    ) {
      _id
    }
  }
`;
