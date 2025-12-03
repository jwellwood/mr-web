import { TypedDocumentNode, gql } from '@apollo/client';
import { ITeam } from '../../team/types';

export const FETCH_ORG_TEAMS: TypedDocumentNode<{
  teams: ITeam[];
}> = gql`
  query FETCH_ORG_TEAMS($orgId: String!) {
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
