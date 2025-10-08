import { TypedDocumentNode, gql } from '@apollo/client';
import { IOrganization } from '../../../types';

export const DELETE_COMPETITION: TypedDocumentNode<{
  org: IOrganization;
}> = gql`
  mutation DeleteCompetition($orgId: String!, $competitionId: String!) {
    deleteCompetition(orgId: $orgId, competitionId: $competitionId) {
      _id
    }
  }
`;
