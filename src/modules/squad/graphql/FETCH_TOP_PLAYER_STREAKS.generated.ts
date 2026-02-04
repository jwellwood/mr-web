import * as Types from '../../../types/__generated__/graphql';

import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Fetch_Top_Player_StreaksQueryVariables = Types.Exact<{
  teamId: Types.Scalars['String']['input'];
  sortBy: Types.Scalars['String']['input'];
}>;


export type Fetch_Top_Player_StreaksQuery = { streaks: Array<{ __typename: 'TopPlayerStreaks', playerId: string, playerName: string, played: number, goals: number, assists: number, combined: number }> };


export const Fetch_Top_Player_StreaksDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FETCH_TOP_PLAYER_STREAKS"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"teamId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sortBy"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"streaks"},"name":{"kind":"Name","value":"TOP_PLAYER_STREAKS"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"teamId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"teamId"}}},{"kind":"Argument","name":{"kind":"Name","value":"sortBy"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sortBy"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"playerId"}},{"kind":"Field","name":{"kind":"Name","value":"playerName"}},{"kind":"Field","name":{"kind":"Name","value":"played"}},{"kind":"Field","name":{"kind":"Name","value":"goals"}},{"kind":"Field","name":{"kind":"Name","value":"assists"}},{"kind":"Field","name":{"kind":"Name","value":"combined"}}]}}]}}]} as unknown as DocumentNode<Fetch_Top_Player_StreaksQuery, Fetch_Top_Player_StreaksQueryVariables>;