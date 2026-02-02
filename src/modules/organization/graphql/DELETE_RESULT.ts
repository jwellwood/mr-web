import { TypedDocumentNode, gql } from '@apollo/client';

export const DELETE_RESULT: TypedDocumentNode = gql`
  mutation DELETE_RESULT($orgId: String!, $resultId: String!) {
    DELETE_RESULT(orgId: $orgId, resultId: $resultId) {
      _id
    }
  }
`;
