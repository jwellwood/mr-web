import { TypedDocumentNode, gql } from '@apollo/client';
import { ITeam } from '../../../types';

export const FETCH_ORG_TEAMS: TypedDocumentNode<{
  teams: ITeam[];
}> = gql`
  query GetTeamsByOrg($orgId: String!) {
    teams: teamsByOrg(orgId: $orgId) {
      _id
      teamName
      isActive
      teamBadge {
        public_id
        url
      }
    }
  }
`;
