import { gql } from '@apollo/client';

export const ADD_ORG_SEASON = gql`
  mutation ADD_ORG_SEASON(
    $orgId: String!
    $yearStarted: String!
    $yearEnded: String!
    $isCurrent: Boolean!
    $comment: String
    $teamIds: [String!]
    $competitionIds: [String!]
  ) {
    season: ADD_ORG_SEASON(
      orgId: $orgId
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
