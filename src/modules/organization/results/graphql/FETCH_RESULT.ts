import { gql } from '@apollo/client';

export const FETCH_RESULT = gql`
  query FETCH_RESULT($resultId: String!) {
    result: RESULT(resultId: $resultId) {
      _id
      date
      gameWeek
      competitionId {
        _id
        name
      }
      orgSeasonId {
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
    }
  }
`;
