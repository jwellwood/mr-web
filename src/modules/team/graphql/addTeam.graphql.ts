import { TypedDocumentNode, gql } from '@apollo/client';
import { ITeam } from '../../../types';
export const ADD_TEAM: TypedDocumentNode<{
  team: ITeam;
}> = gql`
  mutation AddTeam(
    $orgId: String!
    $teamName: String!
    $yearFounded: String
    $location: String
    $country: String
    $isActive: Boolean!
  ) {
    team: addTeam(
      orgId: $orgId
      data: {
        teamName: $teamName
        yearFounded: $yearFounded
        location: $location
        country: $country
        isActive: $isActive
      }
    ) {
      _id
      teamName
      isActive
      yearFounded
      location
      country
    }
  }
`;
