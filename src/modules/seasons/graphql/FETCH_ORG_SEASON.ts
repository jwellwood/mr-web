import { gql } from '@apollo/client';

export const FETCH_ORG_SEASON = gql`
  query FETCH_ORG_SEASON($orgId: String!, $seasonId: String!) {
    orgSeason: ORG_SEASON(orgId: $orgId, seasonId: $seasonId) {
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
        type
        rounds
        relegationPositions
        promotionPositions
        splitIndexes
        priority
        tiebreaker
        teams {
          teamId {
            _id
            teamName
          }
          startingPoints
        }
      }
    }
  }
`;
