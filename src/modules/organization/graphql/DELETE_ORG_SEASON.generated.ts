import * as Types from '../../../types/__generated__/graphql';

import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Delete_Org_SeasonMutationVariables = Types.Exact<{
  orgId: Types.Scalars['String']['input'];
  orgSeasonId: Types.Scalars['String']['input'];
}>;


export type Delete_Org_SeasonMutation = { DELETE_ORG_SEASON: { __typename: 'OrgSeason', _id: string } };


export const Delete_Org_SeasonDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DELETE_ORG_SEASON"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orgId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orgSeasonId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"DELETE_ORG_SEASON"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orgId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orgId"}}},{"kind":"Argument","name":{"kind":"Name","value":"orgSeasonId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orgSeasonId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}}]}}]} as unknown as DocumentNode<Delete_Org_SeasonMutation, Delete_Org_SeasonMutationVariables>;