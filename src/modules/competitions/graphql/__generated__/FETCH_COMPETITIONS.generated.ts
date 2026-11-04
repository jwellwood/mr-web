import * as Types from '../../../../types/__generated__/graphql';

import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Fetch_CompetitionsQueryVariables = Types.Exact<{
  orgId: Types.Scalars['String']['input'];
}>;


export type Fetch_CompetitionsQuery = { org: { __typename: 'Organization', _id: string, competitions: Array<{ __typename: 'Competition', _id: string, name: string, competitionType: string, playersPerTeam: number, matchMinutes: number, isActive: boolean }> } };


export const Fetch_CompetitionsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FETCH_COMPETITIONS"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orgId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"org"},"name":{"kind":"Name","value":"ORGANIZATION"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orgId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orgId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"competitions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"competitionType"}},{"kind":"Field","name":{"kind":"Name","value":"playersPerTeam"}},{"kind":"Field","name":{"kind":"Name","value":"matchMinutes"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}}]}}]}}]}}]} as unknown as DocumentNode<Fetch_CompetitionsQuery, Fetch_CompetitionsQueryVariables>;