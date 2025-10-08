import { TypedDocumentNode, gql } from '@apollo/client';
import { IOrganization } from '../../../types';

export const EDIT_ORG: TypedDocumentNode<{
  org: IOrganization;
}> = gql`
  mutation UpdateOrg(
    $orgId: String!
    $name: String!
    $website: String
    $yearFounded: String
    $city: String
    $country: String
  ) {
    updateOrganization(
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
