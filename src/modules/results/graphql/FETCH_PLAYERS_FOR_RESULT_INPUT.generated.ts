import * as Types from '../../../types/__generated__/graphql';

import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Fetch_Players_By_TeamQueryVariables = Types.Exact<{
  teamId: Types.Scalars['String']['input'];
  orgSeasonId?: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;


export type Fetch_Players_By_TeamQuery = { players: Array<{ __typename: 'PlayerBasic', _id: string, name: string }> };


export const Fetch_Players_By_TeamDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FETCH_PLAYERS_BY_TEAM"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"teamId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orgSeasonId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"players"},"name":{"kind":"Name","value":"PLAYERS_BY_TEAM"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"teamId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"teamId"}}},{"kind":"Argument","name":{"kind":"Name","value":"orgSeasonId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orgSeasonId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<Fetch_Players_By_TeamQuery, Fetch_Players_By_TeamQueryVariables>;