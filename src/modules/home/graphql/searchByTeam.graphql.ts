import { TypedDocumentNode, gql } from '@apollo/client';
import { ITeamResponse } from '../../../types';
export const GET_TEAM_BY_SEARCH: TypedDocumentNode<{
  team: ITeamResponse[];
}> = gql`
  query GetTeamBySearch($filter: String!) {
    team: teamBySearch(filter: $filter) {
      _id
      teamName
      location
      country
      teamBadge {
        url
        public_id
      }
      isActive
      orgId {
        _id
      }
    }
  }
`;
