import { TypedDocumentNode, gql } from '@apollo/client';

import { ITeamResponse } from '../../../types';

export const FETCH_TEAMS_BY_USER: TypedDocumentNode<{
  teams: ITeamResponse[];
}> = gql`
  query FetchTeamsByUser {
    teams: userTeams {
      _id
      teamName
      country
      isActive
      teamBadge {
        public_id
        url
      }
      orgId {
        _id
      }
    }
  }
`;
