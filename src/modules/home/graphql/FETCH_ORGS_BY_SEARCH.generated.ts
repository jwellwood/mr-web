import * as Types from '../../../types/__generated__/graphql';

import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Fetch_Orgs_By_SearchQueryVariables = Types.Exact<{
  filter: Types.Scalars['String']['input'];
}>;


export type Fetch_Orgs_By_SearchQuery = { orgs: Array<{ __typename: 'Organization', _id: string, name: string, city: string | null, country: string | null, badge: { __typename: 'UploadedImage', url: string, public_id: string } }> };


export const Fetch_Orgs_By_SearchDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FETCH_ORGS_BY_SEARCH"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"orgs"},"name":{"kind":"Name","value":"FETCH_ORGS_BY_SEARCH"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"badge"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"public_id"}}]}}]}}]}}]} as unknown as DocumentNode<Fetch_Orgs_By_SearchQuery, Fetch_Orgs_By_SearchQueryVariables>;