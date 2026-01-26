import * as Types from '../../../types/__generated__/graphql';

import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Fetch_TrophiesQueryVariables = Types.Exact<{
  teamId: Types.Scalars['String']['input'];
}>;


export type Fetch_TrophiesQuery = { trophies: Array<{ __typename: 'TrophyResponse', _id: string, name: string, season: string | null, isWinner: boolean, isFinal: boolean, year: string | null }> };


export const Fetch_TrophiesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FETCH_TROPHIES"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"teamId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"trophies"},"name":{"kind":"Name","value":"FETCH_TROPHIES"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"teamId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"teamId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"season"}},{"kind":"Field","name":{"kind":"Name","value":"isWinner"}},{"kind":"Field","name":{"kind":"Name","value":"isFinal"}},{"kind":"Field","name":{"kind":"Name","value":"year"}}]}}]}}]} as unknown as DocumentNode<Fetch_TrophiesQuery, Fetch_TrophiesQueryVariables>;