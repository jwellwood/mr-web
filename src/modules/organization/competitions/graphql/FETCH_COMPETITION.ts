import { gql } from '@apollo/client';

export const FETCH_COMPETITION = gql`
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
