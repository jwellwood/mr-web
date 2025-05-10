import { TypedDocumentNode, gql } from '@apollo/client';
import { ICompetition } from '../../../types';
export const GET_COMPETITION_BY_ID: TypedDocumentNode<{
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
