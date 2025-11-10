import { TypedDocumentNode, gql } from '@apollo/client';

export const DELETE_MATCH: TypedDocumentNode = gql`
  mutation DELETE_MATCH($teamId: String!, $matchId: String!) {
    deleteMatch(teamId: $teamId, matchId: $matchId) {
      _id
    }
  }
`;
