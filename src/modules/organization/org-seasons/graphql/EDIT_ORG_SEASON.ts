import { gql } from '@apollo/client';

export const EDIT_ORG_SEASON = gql`
  mutation EDIT_ORG_SEASON(
    $orgId: String!
    $seasonId: String!
    $yearStarted: String!
    $yearEnded: String!
    $isCurrent: Boolean!
    $comment: String
  ) {
    EDIT_ORG_SEASON(
      orgId: $orgId
      seasonId: $seasonId
      data: {
        yearStarted: $yearStarted
        yearEnded: $yearEnded
        isCurrent: $isCurrent
        comment: $comment
      }
    ) {
      _id
      name
      yearStarted
      yearEnded
      isCurrent
      comment
    }
  }
`;
