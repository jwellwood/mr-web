import { TypedDocumentNode, gql } from '@apollo/client';
import { IOrganization } from '../types';

export const FETCH_COMPETITIONS: TypedDocumentNode<{
  org: IOrganization;
}> = gql`
  query FETCH_COMPETITIONS($orgId: String!) {
    org: organizationById(orgId: $orgId) {
      _id
      competitions {
        _id
        name
        competitionType
        playersPerTeam
        numberOfTeams
        matchMinutes
        isActive
      }
    }
  }
`;
