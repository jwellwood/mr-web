import * as Types from '../../../types/__generated__/graphql';

import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Edit_ProfileMutationVariables = Types.Exact<{
  username: Types.Scalars['String']['input'];
  email: Types.Scalars['String']['input'];
  dateOfBirth?: Types.InputMaybe<Types.Scalars['String']['input']>;
  nationality?: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;


export type Edit_ProfileMutation = { EDIT_USER: { __typename: 'User', username: string, email: string, nationality: string | null, dateOfBirth: string | null } };


export const Edit_ProfileDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"EDIT_PROFILE"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"username"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"dateOfBirth"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"nationality"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"EDIT_USER"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"username"},"value":{"kind":"Variable","name":{"kind":"Name","value":"username"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"nationality"},"value":{"kind":"Variable","name":{"kind":"Name","value":"nationality"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"dateOfBirth"},"value":{"kind":"Variable","name":{"kind":"Name","value":"dateOfBirth"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"nationality"}},{"kind":"Field","name":{"kind":"Name","value":"dateOfBirth"}}]}}]}}]} as unknown as DocumentNode<Edit_ProfileMutation, Edit_ProfileMutationVariables>;