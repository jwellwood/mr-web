import * as Types from '../../../types/__generated__/graphql';

import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Fetch_Player_Match_RecordsQueryVariables = Types.Exact<{
  teamId: Types.Scalars['String']['input'];
  playerId: Types.Scalars['String']['input'];
}>;


export type Fetch_Player_Match_RecordsQuery = { stats: { __typename: 'PlayerMatchRecords', maxGoals: number, maxAssists: number, maxCombined: number } };


export const Fetch_Player_Match_RecordsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FETCH_PLAYER_MATCH_RECORDS"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"teamId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"playerId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"stats"},"name":{"kind":"Name","value":"PLAYER_MATCH_RECORDS"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"teamId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"teamId"}}},{"kind":"Argument","name":{"kind":"Name","value":"playerId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"playerId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"maxGoals"}},{"kind":"Field","name":{"kind":"Name","value":"maxAssists"}},{"kind":"Field","name":{"kind":"Name","value":"maxCombined"}}]}}]}}]} as unknown as DocumentNode<Fetch_Player_Match_RecordsQuery, Fetch_Player_Match_RecordsQueryVariables>;