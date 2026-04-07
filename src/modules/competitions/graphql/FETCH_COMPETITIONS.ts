import { gql } from '@apollo/client';

export const FETCH_COMPETITIONS = gql`
  query FETCH_COMPETITIONS($orgId: String!) {
    org: ORGANIZATION(orgId: $orgId) {
      _id
      competitions {
        _id
        name
        competitionType
        playersPerTeam
        matchMinutes
        isActive
      }
    }
  }
`;
