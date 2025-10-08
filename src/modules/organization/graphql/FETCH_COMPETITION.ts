import { TypedDocumentNode, gql } from '@apollo/client';
import { ICompetition } from '../../../types';

export const FETCH_COMPETITION: TypedDocumentNode<{
  competition: ICompetition;
}> = gql`
  query GetCompetitionById($compId: String!) {
    competition: competitionById(compId: $compId) {
      _id
      name
      competitionType
      matchMinutes
      playersPerTeam
      numberOfTeams
      isActive
      winners {
        teamId {
          teamName
        }
      }
    }
  }
`;
