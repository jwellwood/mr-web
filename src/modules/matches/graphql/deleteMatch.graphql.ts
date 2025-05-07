import { TypedDocumentNode, gql } from '@apollo/client';
import { IMatch } from 'types';

export const DELETE_MATCH: TypedDocumentNode<{
  match: IMatch;
}> = gql`
  mutation DeleteMatch($teamId: String!, $matchId: String!) {
    deleteMatch(teamId: $teamId, matchId: $matchId) {
      _id
    }
  }
`;
