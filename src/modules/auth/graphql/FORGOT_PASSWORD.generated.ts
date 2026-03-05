import * as Types from '../../../types/__generated__/graphql';

import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Forgot_PasswordMutationVariables = Types.Exact<{
  email: Types.Scalars['String']['input'];
  turnstileToken: Types.Scalars['String']['input'];
}>;


export type Forgot_PasswordMutation = { FORGOT_PASSWORD: boolean };


export const Forgot_PasswordDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"FORGOT_PASSWORD"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"turnstileToken"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"FORGOT_PASSWORD"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"turnstileToken"},"value":{"kind":"Variable","name":{"kind":"Name","value":"turnstileToken"}}}]}}]}]}}]} as unknown as DocumentNode<Forgot_PasswordMutation, Forgot_PasswordMutationVariables>;