import { gql } from '@apollo/client';

export const FETCH_ORG_SEASON = gql`
  query FETCH_ORG_SEASON($seasonId: String!) {
    orgSeason: ORG_SEASON(seasonId: $seasonId) {
      _id
      name
      yearStarted
      yearEnded
      isCurrent
      comment
      teamIds {
        _id
        teamName
      }
      competitionConfigs {
        competitionId {
          name
          _id
        }
        rounds
        relegationPositions
        promotionPositions
        splitIndexes
        priority
      }
    }
  }
`;
