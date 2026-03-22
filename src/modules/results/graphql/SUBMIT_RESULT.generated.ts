import * as Types from '../../../types/__generated__/graphql';

import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Submit_ResultMutationVariables = Types.Exact<{
  resultId: Types.Scalars['String']['input'];
  isForfeit: Types.Scalars['Boolean']['input'];
  homeGoals: Types.Scalars['Int']['input'];
  awayGoals: Types.Scalars['Int']['input'];
}>;


export type Submit_ResultMutation = { result: { __typename: 'Result', _id: string } };


export const Submit_ResultDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SUBMIT_RESULT"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"resultId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"isForfeit"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"homeGoals"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"awayGoals"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"result"},"name":{"kind":"Name","value":"SUBMIT_RESULT"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"resultId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"resultId"}}},{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"homeGoals"},"value":{"kind":"Variable","name":{"kind":"Name","value":"homeGoals"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"awayGoals"},"value":{"kind":"Variable","name":{"kind":"Name","value":"awayGoals"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"isForfeit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"isForfeit"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}}]}}]} as unknown as DocumentNode<Submit_ResultMutation, Submit_ResultMutationVariables>;