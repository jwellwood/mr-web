import { TypedDocumentNode, gql } from '@apollo/client';
import { ITeam } from '../../../types';
export const GET_TEAMS_BY_ORG: TypedDocumentNode<{
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
