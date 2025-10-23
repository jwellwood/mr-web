import { TypedDocumentNode, gql } from '@apollo/client';
import { ITeamResponse } from '../types';

export const FETCH_TEAM: TypedDocumentNode<{
  team: ITeamResponse;
}> = gql`
  query FETCH_TEAM($teamId: String!) {
    team: teamById(teamId: $teamId) {
      _id
      teamName
      yearFounded
      location
      country
      homeShirt
      homeShorts
      homeSocks
      awayShirt
      awayShorts
      awaySocks
      kitsBackground
      stadiumName
      stadiumLocation
      stadiumSurface
      stadiumCapacity
      isActive
      teamRoles {
        name
        role
        contact
        roleId
      }
      teamBadge {
        url
        public_id
      }
      orgId {
        _id
        name
        badge {
          public_id
          url
        }
      }
    }
  }
`;
