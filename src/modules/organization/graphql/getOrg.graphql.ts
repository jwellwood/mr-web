import { TypedDocumentNode, gql } from '@apollo/client';
import { IOrganization } from '../../../types';
export const GET_ORG: TypedDocumentNode<{
  org: IOrganization;
}> = gql`
  query GetOrg($orgId: String!) {
    org: organizationById(orgId: $orgId) {
      _id
      name
      website
      yearFounded
      city
      country
      competitions {
        _id
        name
        competitionType
        playersPerTeam
        numberOfTeams
        matchMinutes
        isActive
      }
      badge {
        url
        public_id
      }
    }
  }
`;
