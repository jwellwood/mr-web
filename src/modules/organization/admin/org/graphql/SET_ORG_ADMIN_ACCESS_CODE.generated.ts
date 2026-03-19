import * as Types from '../../../../../types/__generated__/graphql';

import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Set_Org_Admin_Access_CodeMutationVariables = Types.Exact<{
  orgId: Types.Scalars['String']['input'];
}>;


export type Set_Org_Admin_Access_CodeMutation = { SET_ORG_ADMIN_ACCESS_CODE: { __typename: 'Organization', _id: string } };


export const Set_Org_Admin_Access_CodeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SET_ORG_ADMIN_ACCESS_CODE"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orgId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"SET_ORG_ADMIN_ACCESS_CODE"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orgId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orgId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}}]}}]} as unknown as DocumentNode<Set_Org_Admin_Access_CodeMutation, Set_Org_Admin_Access_CodeMutationVariables>;