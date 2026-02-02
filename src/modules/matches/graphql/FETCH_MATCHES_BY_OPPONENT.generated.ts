import * as Types from '../../../types/__generated__/graphql';

import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Fetch_Matches_By_OpponentQueryVariables = Types.Exact<{
  teamId: Types.Scalars['String']['input'];
  opponentId: Types.Scalars['String']['input'];
}>;


export type Fetch_Matches_By_OpponentQuery = { matches: Array<{ __typename: 'TMatch', _id: string, date: string, isHome: boolean, competition: string, teamName: string, opponentGoals: number, teamGoals: number, opponentName: string }> };


export const Fetch_Matches_By_OpponentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FETCH_MATCHES_BY_OPPONENT"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"teamId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"opponentId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"matches"},"name":{"kind":"Name","value":"MATCHES_BY_OPPONENT"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"teamId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"teamId"}}},{"kind":"Argument","name":{"kind":"Name","value":"opponentId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"opponentId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"isHome"}},{"kind":"Field","name":{"kind":"Name","value":"competition"}},{"kind":"Field","name":{"kind":"Name","value":"teamName"}},{"kind":"Field","name":{"kind":"Name","value":"opponentGoals"}},{"kind":"Field","name":{"kind":"Name","value":"teamGoals"}},{"kind":"Field","name":{"kind":"Name","value":"opponentName"}}]}}]}}]} as unknown as DocumentNode<Fetch_Matches_By_OpponentQuery, Fetch_Matches_By_OpponentQueryVariables>;