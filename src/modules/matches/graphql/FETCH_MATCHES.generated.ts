import * as Types from '../../../types/__generated__/graphql';

import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Fetch_MatchesQueryVariables = Types.Exact<{
  teamId: Types.Scalars['String']['input'];
  seasonId: Types.Scalars['String']['input'];
}>;


export type Fetch_MatchesQuery = { matches: Array<{ __typename: 'TMatch', _id: string, date: string, isHome: boolean, competition: string, teamName: string, opponentGoals: number, teamGoals: number, opponentBadge: string | null, opponentName: string, isForfeit: boolean }> };


export const Fetch_MatchesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FETCH_MATCHES"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"teamId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"seasonId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"matches"},"name":{"kind":"Name","value":"MATCHES"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"teamId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"teamId"}}},{"kind":"Argument","name":{"kind":"Name","value":"seasonId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"seasonId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"isHome"}},{"kind":"Field","name":{"kind":"Name","value":"competition"}},{"kind":"Field","name":{"kind":"Name","value":"teamName"}},{"kind":"Field","name":{"kind":"Name","value":"opponentGoals"}},{"kind":"Field","name":{"kind":"Name","value":"teamGoals"}},{"kind":"Field","name":{"kind":"Name","value":"opponentBadge"}},{"kind":"Field","name":{"kind":"Name","value":"opponentName"}},{"kind":"Field","name":{"kind":"Name","value":"isForfeit"}}]}}]}}]} as unknown as DocumentNode<Fetch_MatchesQuery, Fetch_MatchesQueryVariables>;