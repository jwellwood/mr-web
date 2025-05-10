import { TypedDocumentNode, gql } from '@apollo/client';
import { IMatch } from '../../../types';
export const GET_MATCH_BY_ID: TypedDocumentNode<{
  match: IMatch;
}> = gql`
  query GetMatchById($matchId: String!) {
    match: matchById(matchId: $matchId) {
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
      cupRound
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
        minutes
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
