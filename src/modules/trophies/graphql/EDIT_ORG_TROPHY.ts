import { gql } from '@apollo/client';

export const EDIT_ORG_TROPHY = gql`
  mutation EDIT_ORG_TROPHY(
    $orgId: String!
    $orgTrophyId: String!
    $orgSeasonId: String!
    $competitionId: String!
    $winningTeamId: String!
    $runnerUpTeamId: String!
    $comment: String
  ) {
    trophy: EDIT_ORG_TROPHY(
      orgId: $orgId
      orgTrophyId: $orgTrophyId
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
