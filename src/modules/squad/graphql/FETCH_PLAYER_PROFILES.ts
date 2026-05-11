import { gql } from '@apollo/client';

export const FETCH_PLAYER_PROFILES = gql`
  query FETCH_PLAYER_PROFILES($teamId: String!) {
    players: SQUAD_PLAYER_PROFILES(teamId: $teamId) {
      _id
      name
      nationality
      dateOfBirth
      position
    }
  }
`;
