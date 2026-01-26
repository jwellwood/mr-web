import * as Types from '../../../types/__generated__/graphql';

import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Fetch_Orgs_By_UserQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type Fetch_Orgs_By_UserQuery = { orgs: Array<{ __typename: 'Organization', _id: string, name: string, badge: { __typename: 'UploadedImage', public_id: string, url: string } }> };


export const Fetch_Orgs_By_UserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FETCH_ORGS_BY_USER"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"orgs"},"name":{"kind":"Name","value":"userOrganizations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"badge"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"public_id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}}]}}]} as unknown as DocumentNode<Fetch_Orgs_By_UserQuery, Fetch_Orgs_By_UserQueryVariables>;