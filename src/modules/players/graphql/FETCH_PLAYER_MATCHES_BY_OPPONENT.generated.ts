import * as Types from '../../../types/__generated__/graphql';

import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Fetch_Player_Matches_By_OpponentQueryVariables = Types.Exact<{
  playerId: Types.Scalars['String']['input'];
  opponentId: Types.Scalars['String']['input'];
}>;


export type Fetch_Player_Matches_By_OpponentQuery = { matches: Array<{ __typename: 'PlayerMatchesByOpponent', teamGoals: number, opponentGoals: number, opponent: string, date: string, isHome: boolean, _id: string }> };


export const Fetch_Player_Matches_By_OpponentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FETCH_PLAYER_MATCHES_BY_OPPONENT"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"playerId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"opponentId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"matches"},"name":{"kind":"Name","value":"PLAYER_MATCHES_BY_OPPONENT"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"playerId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"playerId"}}},{"kind":"Argument","name":{"kind":"Name","value":"opponentId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"opponentId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"teamGoals"}},{"kind":"Field","name":{"kind":"Name","value":"opponentGoals"}},{"kind":"Field","name":{"kind":"Name","value":"opponent"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"isHome"}},{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}}]}}]} as unknown as DocumentNode<Fetch_Player_Matches_By_OpponentQuery, Fetch_Player_Matches_By_OpponentQueryVariables>;