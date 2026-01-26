import { gql } from '@apollo/client';

export const FETCH_PAST_PLAYERS = gql`
  query FETCH_PAST_PLAYERS($teamId: String!) {
    players: PAST_PLAYERS(teamId: $teamId) {
      _id
      name
      nationality
      joined
      left
      seasons
      position
      image
    }
  }
`;
