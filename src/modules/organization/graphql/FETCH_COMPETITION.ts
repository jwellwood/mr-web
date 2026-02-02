import { TypedDocumentNode, gql } from '@apollo/client';
import { ICompetition } from '../types';

export const FETCH_COMPETITION: TypedDocumentNode<{
  competition: ICompetition;
}> = gql`
  query FETCH_COMPETITION($compId: String!) {
    competition: COMPETITION_BY_ID(compId: $compId) {
      _id
      name
      competitionType
      matchMinutes
      playersPerTeam
      isActive
      winners {
        teamId {
          teamName
        }
      }
    }
  }
`;
