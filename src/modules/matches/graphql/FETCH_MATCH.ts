import { TypedDocumentNode, gql } from '@apollo/client';
import { IMatchResponse } from '../types';

export const FETCH_MATCH: TypedDocumentNode<{
  match: IMatchResponse;
}> = gql`
  query FETCH_MATCH($matchId: String!) {
    match: FETCH_MATCH(matchId: $matchId) {
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
