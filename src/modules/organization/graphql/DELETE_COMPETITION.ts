import { TypedDocumentNode, gql } from '@apollo/client';

export const DELETE_COMPETITION: TypedDocumentNode = gql`
  mutation DELETE_COMPETITION($orgId: String!, $competitionId: String!) {
    deleteCompetition(orgId: $orgId, competitionId: $competitionId) {
      _id
    }
  }
`;
