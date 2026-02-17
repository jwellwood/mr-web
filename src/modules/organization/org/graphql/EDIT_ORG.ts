import { gql } from '@apollo/client';

export const EDIT_ORG = gql`
  mutation EDIT_ORG(
    $orgId: String!
    $name: String!
    $website: String
    $yearFounded: String
    $city: String
    $country: String
  ) {
    EDIT_ORGANIZATION(
      orgId: $orgId
      data: {
        name: $name
        website: $website
        yearFounded: $yearFounded
        city: $city
        country: $country
      }
    ) {
      _id
      name
      website
      yearFounded
      city
      country
    }
  }
`;
