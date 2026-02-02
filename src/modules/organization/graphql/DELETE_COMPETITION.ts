import { TypedDocumentNode, gql } from '@apollo/client';

export const DELETE_COMPETITION: TypedDocumentNode = gql`
  mutation DELETE_COMPETITION($orgId: String!, $competitionId: String!) {
    DELETE_COMPETITION(orgId: $orgId, competitionId: $competitionId) {
      _id
    }
  }
`;
