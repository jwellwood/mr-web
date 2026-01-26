import * as Types from '../../../types/__generated__/graphql';

import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Fetch_Player_Seasons_SummaryQueryVariables = Types.Exact<{
  playerId: Types.Scalars['String']['input'];
}>;


export type Fetch_Player_Seasons_SummaryQuery = { seasons: Array<{ __typename: 'TPlayerSeasonsSummary', seasonName: string, seasonId: string, apps: number, goals: number, assists: number }> };


export const Fetch_Player_Seasons_SummaryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FETCH_PLAYER_SEASONS_SUMMARY"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"playerId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"seasons"},"name":{"kind":"Name","value":"PLAYER_SEASONS_SUMMARY"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"playerId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"playerId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"seasonName"}},{"kind":"Field","name":{"kind":"Name","value":"seasonId"}},{"kind":"Field","name":{"kind":"Name","value":"apps"}},{"kind":"Field","name":{"kind":"Name","value":"goals"}},{"kind":"Field","name":{"kind":"Name","value":"assists"}}]}}]}}]} as unknown as DocumentNode<Fetch_Player_Seasons_SummaryQuery, Fetch_Player_Seasons_SummaryQueryVariables>;