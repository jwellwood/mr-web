import { gql } from '@apollo/client';

export const FETCH_MATCH = gql`
  query FETCH_MATCH($matchId: String!) {
    match: MATCH(matchId: $matchId) {
      _id
      date
      isHome
      seasonId {
        _id
      }
      competitionId {
        _id
        name
        competitionType
      }
      teamId {
        _id
        teamName
        teamBadge {
          public_id
          url
        }
      }
      teamGoals
      opponentGoals
      leaguePosition
      isForfeit
      opponentId {
        _id
        teamName
        teamBadge {
          public_id
          url
        }
      }
      matchPlayers {
        playerId {
          _id
          name
          position
        }
        isStarter
        matchPosition
        goals
        assists
        pensScored
        pensMissed
        pensSaved
        yellowCards
        redCard
        conceded
        ownGoals
        cleanSheet
        mvp
      }
    }
  }
`;
