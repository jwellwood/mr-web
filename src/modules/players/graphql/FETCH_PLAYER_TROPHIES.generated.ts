import * as Types from '../../../types/__generated__/graphql';

import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Fetch_Player_TrophiesQueryVariables = Types.Exact<{
  playerId: Types.Scalars['String']['input'];
}>;


export type Fetch_Player_TrophiesQuery = { trophies: Array<{ __typename: 'Trophy', _id: string, name: string, year: string, isWinner: boolean, isFinal: boolean }> };


export const Fetch_Player_TrophiesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FETCH_PLAYER_TROPHIES"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"playerId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"trophies"},"name":{"kind":"Name","value":"PLAYER_TROPHIES"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"playerId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"playerId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"isWinner"}},{"kind":"Field","name":{"kind":"Name","value":"isFinal"}}]}}]}}]} as unknown as DocumentNode<Fetch_Player_TrophiesQuery, Fetch_Player_TrophiesQueryVariables>;