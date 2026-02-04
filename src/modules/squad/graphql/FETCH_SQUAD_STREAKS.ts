import { gql } from '@apollo/client';

export const FETCH_SQUAD_STREAKS = gql`
  query FETCH_SQUAD_STREAKS($teamId: String!) {
    streaks: SQUAD_STREAK_RECORDS(teamId: $teamId) {
      played {
        value
        players {
          playerId
          playerName
        }
      }
      goals {
        value
        players {
          playerId
          playerName
        }
      }
      assists {
        value
        players {
          playerId
          playerName
        }
      }
      combined {
        value
        players {
          playerId
          playerName
        }
      }
    }
  }
`;
