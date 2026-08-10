import { gql } from '@apollo/client';

export const ADD_TEAM = gql`
  mutation ADD_TEAM(
    $orgId: String!
    $teamName: String!
    $location: String
    $country: String
    $isActive: Boolean!
  ) {
    team: ADD_TEAM(
      orgId: $orgId
      data: { teamName: $teamName, location: $location, country: $country, isActive: $isActive }
    ) {
      teamName
      isActive
      location
      country
    }
  }
`;
