import { TypedDocumentNode, gql } from '@apollo/client';

export const DELETE_RESULT: TypedDocumentNode = gql`
  mutation DELETE_RESULT($orgId: String!, $resultId: String!) {
    deleteResult(orgId: $orgId, resultId: $resultId) {
      _id
    }
  }
`;
