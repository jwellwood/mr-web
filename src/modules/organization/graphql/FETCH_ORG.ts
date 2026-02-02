import { TypedDocumentNode, gql } from '@apollo/client';
import { IOrganization } from '../types';

export const FETCH_ORG: TypedDocumentNode<{
  org: IOrganization;
}> = gql`
  query FETCH_ORG($orgId: String!) {
    org: ORGANIZATION(orgId: $orgId) {
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
