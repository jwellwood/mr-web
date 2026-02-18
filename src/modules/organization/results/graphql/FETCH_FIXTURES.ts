import { gql } from '@apollo/client';

export const FETCH_FIXTURES = gql`
  query FETCH_FIXTURES($orgId: String!, $orgSeasonId: String!) {
    fixtures: FIXTURES(orgId: $orgId, orgSeasonId: $orgSeasonId) {
      _id
      date
      gameWeek
      competitionId {
        _id
        name
      }
      homeTeam {
        _id
        teamName
      }
      awayTeam {
        _id
        teamName
      }
      isForfeit
      isComplete
    }
  }
`;
