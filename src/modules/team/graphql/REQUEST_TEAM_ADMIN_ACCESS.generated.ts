import * as Types from '../../../types/__generated__/graphql';

import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Request_Team_Admin_AccessMutationVariables = Types.Exact<{
  teamId: Types.Scalars['String']['input'];
  code: Types.Scalars['String']['input'];
}>;


export type Request_Team_Admin_AccessMutation = { REQUEST_TEAM_ADMIN_ACCESS: { __typename: 'AuthPayload', token: string } };


export const Request_Team_Admin_AccessDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"REQUEST_TEAM_ADMIN_ACCESS"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"teamId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"code"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"REQUEST_TEAM_ADMIN_ACCESS"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"teamId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"teamId"}}},{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"code"},"value":{"kind":"Variable","name":{"kind":"Name","value":"code"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"token"}}]}}]}}]} as unknown as DocumentNode<Request_Team_Admin_AccessMutation, Request_Team_Admin_AccessMutationVariables>;