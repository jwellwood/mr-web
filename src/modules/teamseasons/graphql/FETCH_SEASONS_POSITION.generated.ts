import * as Types from '../../../types/__generated__/graphql';

import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Fetch_Seasons_PositionQueryVariables = Types.Exact<{
  teamId: Types.Scalars['String']['input'];
}>;


export type Fetch_Seasons_PositionQuery = { position: Array<{ __typename: 'PositionFinishes', seasonId: string | null, name: string | null, position: number | null, totalFinalPositions: number | null, division: string | null }> };


export const Fetch_Seasons_PositionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FETCH_SEASONS_POSITION"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"teamId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"position"},"name":{"kind":"Name","value":"FETCH_SEASONS_POSITION"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"teamId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"teamId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"seasonId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"position"}},{"kind":"Field","name":{"kind":"Name","value":"totalFinalPositions"}},{"kind":"Field","name":{"kind":"Name","value":"division"}}]}}]}}]} as unknown as DocumentNode<Fetch_Seasons_PositionQuery, Fetch_Seasons_PositionQueryVariables>;