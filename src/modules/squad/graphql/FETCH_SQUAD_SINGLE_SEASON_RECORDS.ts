import { TypedDocumentNode, gql } from '@apollo/client';
import { ISquadSingleSeasonRecords } from '../types';

export const FETCH_SQUAD_SINGLE_SEASON_RECORDS: TypedDocumentNode<{
  stats: ISquadSingleSeasonRecords;
}> = gql`
  query FETCH_SQUAD_SINGLE_SEASON_RECORDS($teamId: String!) {
    stats: SQUAD_SINGLE_SEASON_RECORDS(teamId: $teamId) {
      goals {
        value
        players {
          id
          name
        }
        seasons {
          id
          name
        }
      }
      assists {
        value
        players {
          id
          name
        }
        seasons {
          id
          name
        }
      }
      combined {
        value
        players {
          id
          name
        }
        seasons {
          id
          name
        }
      }
    }
  }
`;
