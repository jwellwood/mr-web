import * as Types from '../../../types/__generated__/graphql';

import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Fetch_Match_OpponentsQueryVariables = Types.Exact<{
  teamId: Types.Scalars['String']['input'];
}>;


export type Fetch_Match_OpponentsQuery = { stats: Array<{ __typename: 'TMatchOpponent', _id: string, isActive: boolean, opponentName: string, opponentBadge: string | null, total: number, wins: number, draws: number, losses: number, totalGoalsScored: number, totalGoalsConceded: number, totalGoalDifference: number }> };


export const Fetch_Match_OpponentsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FETCH_MATCH_OPPONENTS"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"teamId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"stats"},"name":{"kind":"Name","value":"MATCH_OPPONENTS"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"teamId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"teamId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"opponentName"}},{"kind":"Field","name":{"kind":"Name","value":"opponentBadge"}},{"kind":"Field","name":{"kind":"Name","value":"total"}},{"kind":"Field","name":{"kind":"Name","value":"wins"}},{"kind":"Field","name":{"kind":"Name","value":"draws"}},{"kind":"Field","name":{"kind":"Name","value":"losses"}},{"kind":"Field","name":{"kind":"Name","value":"totalGoalsScored"}},{"kind":"Field","name":{"kind":"Name","value":"totalGoalsConceded"}},{"kind":"Field","name":{"kind":"Name","value":"totalGoalDifference"}}]}}]}}]} as unknown as DocumentNode<Fetch_Match_OpponentsQuery, Fetch_Match_OpponentsQueryVariables>;