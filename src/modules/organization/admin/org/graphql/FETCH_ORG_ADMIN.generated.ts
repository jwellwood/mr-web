import * as Types from '../../../../../types/__generated__/graphql';

import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Fetch_Org_Admin_ViewQueryVariables = Types.Exact<{
  orgId: Types.Scalars['String']['input'];
}>;


export type Fetch_Org_Admin_ViewQuery = { org: { __typename: 'OrgAdminView', orgName: string, orgAdminAccessCode: string | null, orgAdminAccessEnabled: boolean | null, adminUsers: Array<{ __typename: 'OrgAdminUser', username: string, email: string }> } };


export const Fetch_Org_Admin_ViewDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FETCH_ORG_ADMIN_VIEW"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orgId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"org"},"name":{"kind":"Name","value":"FETCH_ORG_ADMIN_VIEW"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orgId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orgId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"orgName"}},{"kind":"Field","name":{"kind":"Name","value":"orgAdminAccessCode"}},{"kind":"Field","name":{"kind":"Name","value":"orgAdminAccessEnabled"}},{"kind":"Field","name":{"kind":"Name","value":"adminUsers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]}}]} as unknown as DocumentNode<Fetch_Org_Admin_ViewQuery, Fetch_Org_Admin_ViewQueryVariables>;