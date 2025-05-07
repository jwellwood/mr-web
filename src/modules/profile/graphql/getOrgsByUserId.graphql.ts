import { TypedDocumentNode, gql } from '@apollo/client';
import { IOrganization } from 'types';

export const GET_ORGS_BY_USER_ID: TypedDocumentNode<{
  orgs: IOrganization[];
}> = gql`
  query GetOrgsByUserId {
    orgs: userOrganizations {
      _id
      name
      badge {
        public_id
        url
      }
    }
  }
`;
