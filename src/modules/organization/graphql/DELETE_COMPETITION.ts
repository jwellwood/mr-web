import { TypedDocumentNode, gql } from '@apollo/client';

export const DELETE_COMPETITION: TypedDocumentNode = gql`
  mutation DeleteCompetition($orgId: String!, $competitionId: String!) {
    deleteCompetition(orgId: $orgId, competitionId: $competitionId) {
      _id
    }
  }
`;
