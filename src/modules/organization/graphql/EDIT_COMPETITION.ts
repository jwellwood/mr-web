import { TypedDocumentNode, gql } from '@apollo/client';
import { ICompetition } from '../types';

export const EDIT_COMPETITION: TypedDocumentNode<{
  comp: ICompetition;
}> = gql`
  mutation EDIT_COMPETITION(
    $compId: String!
    $orgId: String!
    $name: String!
    $matchMinutes: Float!
    $playersPerTeam: Float!
    $competitionType: String!
    $isActive: Boolean!
  ) {
    EDIT_COMPETITION(
      compId: $compId
      orgId: $orgId
      data: {
        name: $name
        matchMinutes: $matchMinutes
        playersPerTeam: $playersPerTeam
        competitionType: $competitionType
        isActive: $isActive
      }
    ) {
      _id
      name
      matchMinutes
      playersPerTeam
      competitionType
      isActive
    }
  }
`;
