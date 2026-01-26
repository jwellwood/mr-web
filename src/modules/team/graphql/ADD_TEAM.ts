import { gql } from '@apollo/client';

export const ADD_TEAM = gql`
  mutation ADD_TEAM(
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
      teamName
      isActive
      yearFounded
      location
      country
    }
  }
`;
