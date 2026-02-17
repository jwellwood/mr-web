import * as Types from '../../../../types/__generated__/graphql';

import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Fetch_CompetitionQueryVariables = Types.Exact<{
  compId: Types.Scalars['String']['input'];
}>;


export type Fetch_CompetitionQuery = { competition: { __typename: 'Competition', _id: string, name: string, competitionType: string, matchMinutes: number, playersPerTeam: number, isActive: boolean, winners: Array<{ __typename: 'CompetitionWinner', teamId: { __typename: 'Team', teamName: string } }> } };


export const Fetch_CompetitionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FETCH_COMPETITION"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"compId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"competition"},"name":{"kind":"Name","value":"COMPETITION_BY_ID"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"compId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"compId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"competitionType"}},{"kind":"Field","name":{"kind":"Name","value":"matchMinutes"}},{"kind":"Field","name":{"kind":"Name","value":"playersPerTeam"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"winners"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"teamId"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"teamName"}}]}}]}}]}}]}}]} as unknown as DocumentNode<Fetch_CompetitionQuery, Fetch_CompetitionQueryVariables>;