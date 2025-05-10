import { TypedDocumentNode, gql } from '@apollo/client';
import { ITeamResponse } from '../../../types';
export const GET_TEAMS_BY_USER_ID: TypedDocumentNode<{
  teams: ITeamResponse[];
}> = gql`
  query GetTeamsByUserId {
    teams: userTeams {
      _id
      teamName
      country
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
