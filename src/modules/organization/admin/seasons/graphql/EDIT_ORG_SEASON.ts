import { gql } from '@apollo/client';

export const EDIT_ORG_SEASON = gql`
  mutation EDIT_ORG_SEASON(
    $orgId: String!
    $seasonId: String!
    $yearStarted: String!
    $yearEnded: String!
    $isCurrent: Boolean!
    $comment: String
    $teamIds: [String!]
    $competitionIds: [String!]
  ) {
    EDIT_ORG_SEASON(
      orgId: $orgId
      seasonId: $seasonId
      data: {
        yearStarted: $yearStarted
        yearEnded: $yearEnded
        isCurrent: $isCurrent
        comment: $comment
        teamIds: $teamIds
        competitionIds: $competitionIds
      }
    ) {
      _id
    }
  }
`;
