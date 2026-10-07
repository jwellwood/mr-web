import * as Types from '../../../types/__generated__/graphql';

import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Delete_Org_TrophyMutationVariables = Types.Exact<{
  orgId: Types.Scalars['String']['input'];
  orgTrophyId: Types.Scalars['String']['input'];
}>;


export type Delete_Org_TrophyMutation = { trophy: { __typename: 'OrgTrophy', _id: string } };


export const Delete_Org_TrophyDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DELETE_ORG_TROPHY"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orgId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orgTrophyId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"trophy"},"name":{"kind":"Name","value":"DELETE_ORG_TROPHY"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orgId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orgId"}}},{"kind":"Argument","name":{"kind":"Name","value":"orgTrophyId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orgTrophyId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}}]}}]} as unknown as DocumentNode<Delete_Org_TrophyMutation, Delete_Org_TrophyMutationVariables>;