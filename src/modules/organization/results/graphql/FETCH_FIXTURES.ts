import { gql } from '@apollo/client';

export const FETCH_FIXTURES = gql`
  query FETCH_FIXTURES($orgId: String!, $orgSeasonId: String!) {
    fixtures: FIXTURES(orgId: $orgId, orgSeasonId: $orgSeasonId) {
      _id
      date
      gameWeek
      competitionId {
        _id
        name
      }
      homeTeam {
        _id
        teamName
      }
      awayTeam {
        _id
        teamName
      }
      isForfeit
      isComplete
      homeGoalscorers {
        playerId {
          _id
          name
        }
        goals
      }
      awayGoalscorers {
        playerId {
          _id
          name
        }
        goals
      }
      resultStatus
    }
  }
`;
