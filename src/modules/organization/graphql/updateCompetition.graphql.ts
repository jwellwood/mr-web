import { TypedDocumentNode, gql } from '@apollo/client';
import { ICompetition } from '../../../types';
export const UPDATE_COMPETITION: TypedDocumentNode<{
  org: ICompetition;
}> = gql`
  mutation UpdateCompetition(
    $compId: String!
    $orgId: String!
    $name: String!
    $matchMinutes: Float!
    $playersPerTeam: Float!
    $numberOfTeams: Float!
    $competitionType: String!
    $isActive: Boolean!
  ) {
    updateCompetition(
      compId: $compId
      orgId: $orgId
      data: {
        name: $name
        matchMinutes: $matchMinutes
        playersPerTeam: $playersPerTeam
        numberOfTeams: $numberOfTeams
        competitionType: $competitionType
        isActive: $isActive
      }
    ) {
      _id
      name
      matchMinutes
      playersPerTeam
      numberOfTeams
      competitionType
      isActive
    }
  }
`;
