import { gql } from '@apollo/client';

export const FETCH_HALL_OF_FAME = gql`
  query FETCH_HALL_OF_FAME($teamId: String!) {
    players: HALL_OF_FAME_PLAYERS(teamId: $teamId) {
      _id
      name
      squadNumber
      nationality
      yearJoined
      position
      description
      image {
        public_id
        url
      }
    }
  }
`;
