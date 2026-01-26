import * as Types from '../../../types/__generated__/graphql';

import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Fetch_TrophyQueryVariables = Types.Exact<{
  trophyId: Types.Scalars['String']['input'];
}>;


export type Fetch_TrophyQuery = { trophy: { __typename: 'TrophyResponse', _id: string, name: string, season: string | null, opponent: string | null, year: string | null, isFinal: boolean, isWinner: boolean, comment: string | null } };


export const Fetch_TrophyDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FETCH_TROPHY"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"trophyId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"trophy"},"name":{"kind":"Name","value":"FETCH_TROPHY"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"trophyId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"trophyId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"season"}},{"kind":"Field","name":{"kind":"Name","value":"opponent"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"isFinal"}},{"kind":"Field","name":{"kind":"Name","value":"isWinner"}},{"kind":"Field","name":{"kind":"Name","value":"comment"}}]}}]}}]} as unknown as DocumentNode<Fetch_TrophyQuery, Fetch_TrophyQueryVariables>;