import { TypedDocumentNode, gql } from '@apollo/client';
import { ITeam } from 'types';

export const EDIT_TEAM_BADGE: TypedDocumentNode<{
  team: ITeam;
}> = gql`
  mutation EditTeamBadge($teamId: String!, $public_id: String!, $url: String!) {
    editTeamBadge(teamId: $teamId, data: { public_id: $public_id, url: $url }) {
      _id
      teamBadge {
        public_id
        url
      }
    }
  }
`;
