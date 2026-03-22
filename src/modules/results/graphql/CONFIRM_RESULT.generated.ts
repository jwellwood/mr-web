import * as Types from '../../../types/__generated__/graphql';

import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Confirm_ResultMutationVariables = Types.Exact<{
  resultId: Types.Scalars['String']['input'];
  isConfirmed: Types.Scalars['Boolean']['input'];
}>;


export type Confirm_ResultMutation = { result: { __typename: 'Result', _id: string } };


export const Confirm_ResultDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CONFIRM_RESULT"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"resultId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"isConfirmed"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"result"},"name":{"kind":"Name","value":"CONFIRM_RESULT"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"resultId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"resultId"}}},{"kind":"Argument","name":{"kind":"Name","value":"isConfirmed"},"value":{"kind":"Variable","name":{"kind":"Name","value":"isConfirmed"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}}]}}]} as unknown as DocumentNode<Confirm_ResultMutation, Confirm_ResultMutationVariables>;