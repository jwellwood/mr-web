import { gql } from '@apollo/client';

export const FETCH_PLAYER_STATS = gql`
  query FETCH_PLAYER_STATS($playerId: String!, $seasonId: String!, $competitionId: String!) {
    player: PLAYER_STATS(playerId: $playerId, seasonId: $seasonId, competitionId: $competitionId) {
      _id
      apps
      goals
      assists
      mvp
      conceded
      cleanSheet
      ownGoals
      pensMissed
      pensSaved
      pensScored
      yellowCards
      redCard
      wins
      draws
      defeats
      goalsFor
      goalsAgainst
      difference
      gamesWithGoal
      gamesWithAssist
      gamesWithGoalAndAssist
      gamesWithGoalOrAssist
    }
  }
`;
