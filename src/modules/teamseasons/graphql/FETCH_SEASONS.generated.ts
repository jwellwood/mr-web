import * as Types from '../../../types/__generated__/graphql';

import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Fetch_SeasonsQueryVariables = Types.Exact<{
  teamId: Types.Scalars['String']['input'];
}>;


export type Fetch_SeasonsQuery = { seasons: Array<{ __typename: 'TeamSeason', _id: string, name: string, yearStarted: string, yearEnded: string, leaguePosition: number | null, totalFinalPositions: number | null, division: string | null }> };


export const Fetch_SeasonsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FETCH_SEASONS"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"teamId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"seasons"},"name":{"kind":"Name","value":"FETCH_SEASONS"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"teamId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"teamId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"yearStarted"}},{"kind":"Field","name":{"kind":"Name","value":"yearEnded"}},{"kind":"Field","name":{"kind":"Name","value":"leaguePosition"}},{"kind":"Field","name":{"kind":"Name","value":"totalFinalPositions"}},{"kind":"Field","name":{"kind":"Name","value":"division"}}]}}]}}]} as unknown as DocumentNode<Fetch_SeasonsQuery, Fetch_SeasonsQueryVariables>;