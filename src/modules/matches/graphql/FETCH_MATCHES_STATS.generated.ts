import * as Types from '../../../types/__generated__/graphql';

import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Fetch_Matches_StatsQueryVariables = Types.Exact<{
  teamId: Types.Scalars['String']['input'];
  seasonId: Types.Scalars['String']['input'];
}>;


export type Fetch_Matches_StatsQuery = { stats: { __typename: 'TMatchStats', total: number | null, wins: number | null, draws: number | null, defeats: number | null, scored: number | null, conceded: number | null, teamAvg: number | null, oppAvg: number | null, difference: number | null } };


export const Fetch_Matches_StatsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FETCH_MATCHES_STATS"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"teamId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"seasonId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"stats"},"name":{"kind":"Name","value":"FETCH_MATCHES_STATS"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"teamId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"teamId"}}},{"kind":"Argument","name":{"kind":"Name","value":"seasonId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"seasonId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total"}},{"kind":"Field","name":{"kind":"Name","value":"wins"}},{"kind":"Field","name":{"kind":"Name","value":"draws"}},{"kind":"Field","name":{"kind":"Name","value":"defeats"}},{"kind":"Field","name":{"kind":"Name","value":"scored"}},{"kind":"Field","name":{"kind":"Name","value":"conceded"}},{"kind":"Field","name":{"kind":"Name","value":"teamAvg"}},{"kind":"Field","name":{"kind":"Name","value":"oppAvg"}},{"kind":"Field","name":{"kind":"Name","value":"difference"}}]}}]}}]} as unknown as DocumentNode<Fetch_Matches_StatsQuery, Fetch_Matches_StatsQueryVariables>;