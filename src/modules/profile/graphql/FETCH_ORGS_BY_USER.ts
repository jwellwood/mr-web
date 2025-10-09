import { TypedDocumentNode, gql } from '@apollo/client';

import { IOrganization } from '../../organization/types';

export const FETCH_ORGS_BY_USER: TypedDocumentNode<{
  orgs: IOrganization[];
}> = gql`
  query FetchOrgsByUser {
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
