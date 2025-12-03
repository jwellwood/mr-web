import { TypedDocumentNode, gql } from '@apollo/client';

export const ADD_COMPETITION: TypedDocumentNode = gql`
  mutation ADD_COMPETITION(
    $orgId: String!
    $name: String!
    $matchMinutes: Float!
    $numberOfTeams: Float!
    $playersPerTeam: Float!
    $competitionType: String!
    $isActive: Boolean!
  ) {
    addCompetition(
      orgId: $orgId
      data: {
        name: $name
        competitionType: $competitionType
        matchMinutes: $matchMinutes
        playersPerTeam: $playersPerTeam
        numberOfTeams: $numberOfTeams
        isActive: $isActive
      }
    ) {
      _id
    }
  }
`;
