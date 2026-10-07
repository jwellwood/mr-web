import { gql } from '@apollo/client';

export const ADD_ORG_TROPHY = gql`
  mutation ADD_ORG_TROPHY(
    $orgId: String!
    $orgSeasonId: String!
    $competitionId: String!
    $winningTeamId: String!
    $runnerUpTeamId: String!
    $comment: String
  ) {
    trophy: ADD_ORG_TROPHY(
      orgId: $orgId
      data: {
        orgSeasonId: $orgSeasonId
        competitionId: $competitionId
        winningTeamId: $winningTeamId
        runnerUpTeamId: $runnerUpTeamId
        comment: $comment
      }
    ) {
      _id
    }
  }
`;
