import * as Types from '../../../types/__generated__/graphql';

import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Fetch_SeasonQueryVariables = Types.Exact<{
  seasonId: Types.Scalars['String']['input'];
}>;


export type Fetch_SeasonQuery = { season: { __typename: 'TeamSeason', _id: string, name: string, yearStarted: string, yearEnded: string, leaguePosition: number | null, totalFinalPositions: number | null, division: string | null, comment: string | null } };


export const Fetch_SeasonDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FETCH_SEASON"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"seasonId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"season"},"name":{"kind":"Name","value":"FETCH_SEASON"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"seasonId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"seasonId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"yearStarted"}},{"kind":"Field","name":{"kind":"Name","value":"yearEnded"}},{"kind":"Field","name":{"kind":"Name","value":"leaguePosition"}},{"kind":"Field","name":{"kind":"Name","value":"totalFinalPositions"}},{"kind":"Field","name":{"kind":"Name","value":"division"}},{"kind":"Field","name":{"kind":"Name","value":"comment"}}]}}]}}]} as unknown as DocumentNode<Fetch_SeasonQuery, Fetch_SeasonQueryVariables>;