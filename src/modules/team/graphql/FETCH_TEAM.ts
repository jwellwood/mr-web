import { gql } from '@apollo/client';

export const FETCH_TEAM = gql`
  query FETCH_TEAM($teamId: String!) {
    team: FETCH_TEAM(teamId: $teamId) {
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
