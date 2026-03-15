import { gql } from '@apollo/client';

export const ADD_ORG = gql`
  mutation ADD_ORG(
    $name: String!
    $website: String
    $yearFounded: String
    $city: String
    $country: String
  ) {
    org: ADD_ORGANIZATION(
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
