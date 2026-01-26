import { gql } from '@apollo/client';

export const EDIT_PLAYER_PHOTO = gql`
  mutation EDIT_PLAYER_PHOTO(
    $teamId: String!
    $playerId: String!
    $public_id: String!
    $url: String!
  ) {
    EDIT_PLAYER_PHOTO(
      teamId: $teamId
      playerId: $playerId
      data: { public_id: $public_id, url: $url }
    ) {
      _id
      image {
        public_id
        url
      }
    }
  }
`;
