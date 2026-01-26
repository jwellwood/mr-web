import { gql } from '@apollo/client';

export const FETCH_AWARDS_BY_PLAYER = gql`
  query FETCH_AWARDS_BY_PLAYER($playerId: String!) {
    awards: awardsByPlayer(playerId: $playerId) {
      _id
      season
      awardName
      awardValue
      comment
    }
  }
`;
