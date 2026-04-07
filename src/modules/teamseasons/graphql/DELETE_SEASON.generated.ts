import * as Types from '../../../types/__generated__/graphql';

import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Delete_SeasonMutationVariables = Types.Exact<{
  teamId: Types.Scalars['String']['input'];
  seasonId: Types.Scalars['String']['input'];
}>;


export type Delete_SeasonMutation = { season: { __typename: 'TeamSeason', _id: string } };


export const Delete_SeasonDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DELETE_SEASON"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"teamId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"seasonId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"season"},"name":{"kind":"Name","value":"DELETE_SEASON"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"teamId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"teamId"}}},{"kind":"Argument","name":{"kind":"Name","value":"seasonId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"seasonId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}}]}}]} as unknown as DocumentNode<Delete_SeasonMutation, Delete_SeasonMutationVariables>;