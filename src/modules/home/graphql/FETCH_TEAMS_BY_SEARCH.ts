import { TypedDocumentNode, gql } from '@apollo/client';
import { ITeamResponse } from '../../team/types';

export const FETCH_TEAMS_BY_SEARCH: TypedDocumentNode<{
  teams: ITeamResponse[];
}> = gql`
  query FetchTeamsBySearch($filter: String!) {
    teams: teamBySearch(filter: $filter) {
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
