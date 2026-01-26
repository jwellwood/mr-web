import * as Types from '../../../types/__generated__/graphql';

import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Fetch_Squad_Record_Goals_In_MatchQueryVariables = Types.Exact<{
  teamId: Types.Scalars['String']['input'];
}>;


export type Fetch_Squad_Record_Goals_In_MatchQuery = { stats: Array<{ __typename: 'MostInMatch', player: string, total: number, date: string, opponentName: string, opponentGoals: number, teamGoals: number, matchId: string }> };


export const Fetch_Squad_Record_Goals_In_MatchDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FETCH_SQUAD_RECORD_GOALS_IN_MATCH"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"teamId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"stats"},"name":{"kind":"Name","value":"SQUAD_RECORD_GOALS_IN_MATCH"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"teamId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"teamId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"player"}},{"kind":"Field","name":{"kind":"Name","value":"total"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"opponentName"}},{"kind":"Field","name":{"kind":"Name","value":"opponentGoals"}},{"kind":"Field","name":{"kind":"Name","value":"teamGoals"}},{"kind":"Field","name":{"kind":"Name","value":"matchId"}}]}}]}}]} as unknown as DocumentNode<Fetch_Squad_Record_Goals_In_MatchQuery, Fetch_Squad_Record_Goals_In_MatchQueryVariables>;