import { TypedDocumentNode, gql } from '@apollo/client';
import { IOrganization } from '../types';

export const ADD_ORG: TypedDocumentNode<{
  org: IOrganization;
}> = gql`
  mutation AddOrganization(
    $name: String!
    $website: String
    $yearFounded: String
    $city: String
    $country: String
  ) {
    org: addOrganization(
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
