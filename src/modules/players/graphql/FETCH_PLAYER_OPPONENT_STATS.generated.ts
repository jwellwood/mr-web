import * as Types from '../../../types/__generated__/graphql';

import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Fetch_Player_Opponent_StatsQueryVariables = Types.Exact<{
  playerId: Types.Scalars['String']['input'];
}>;


export type Fetch_Player_Opponent_StatsQuery = { stats: Array<{ __typename: 'PlayerOpponentStats', opponentId: string, opponent: string, opponentBadge: string | null, matches: number, goals: number, assists: number, conceded: number }> };


export const Fetch_Player_Opponent_StatsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FETCH_PLAYER_OPPONENT_STATS"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"playerId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"stats"},"name":{"kind":"Name","value":"PLAYER_OPPONENT_STATS"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"playerId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"playerId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"opponentId"}},{"kind":"Field","name":{"kind":"Name","value":"opponent"}},{"kind":"Field","name":{"kind":"Name","value":"opponentBadge"}},{"kind":"Field","name":{"kind":"Name","value":"matches"}},{"kind":"Field","name":{"kind":"Name","value":"goals"}},{"kind":"Field","name":{"kind":"Name","value":"assists"}},{"kind":"Field","name":{"kind":"Name","value":"conceded"}}]}}]}}]} as unknown as DocumentNode<Fetch_Player_Opponent_StatsQuery, Fetch_Player_Opponent_StatsQueryVariables>;