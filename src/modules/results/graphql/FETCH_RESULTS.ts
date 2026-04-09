import { gql } from '@apollo/client';

export const FETCH_RESULTS = gql`
  query FETCH_RESULTS($orgId: String!, $orgSeasonId: String!) {
    results: RESULTS(orgId: $orgId, orgSeasonId: $orgSeasonId) {
      _id
      date
      kickoffTime
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
      homeGoals
      awayGoals
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
      submittedByTeam {
        _id
        teamName
      }
      confirmedByTeam {
        _id
        teamName
      }
      orgSeasonId {
        _id
      }
    }
  }
`;
