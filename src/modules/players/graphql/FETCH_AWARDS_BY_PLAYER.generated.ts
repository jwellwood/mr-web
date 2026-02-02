import * as Types from '../../../types/__generated__/graphql';

import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Fetch_Awards_By_PlayerQueryVariables = Types.Exact<{
  playerId: Types.Scalars['String']['input'];
}>;


export type Fetch_Awards_By_PlayerQuery = { awards: Array<{ __typename: 'AwardByPlayer', _id: string, season: string, awardName: string, awardValue: number | null, comment: string | null }> };


export const Fetch_Awards_By_PlayerDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FETCH_AWARDS_BY_PLAYER"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"playerId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"awards"},"name":{"kind":"Name","value":"AWARDS_BY_PLAYER"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"playerId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"playerId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"season"}},{"kind":"Field","name":{"kind":"Name","value":"awardName"}},{"kind":"Field","name":{"kind":"Name","value":"awardValue"}},{"kind":"Field","name":{"kind":"Name","value":"comment"}}]}}]}}]} as unknown as DocumentNode<Fetch_Awards_By_PlayerQuery, Fetch_Awards_By_PlayerQueryVariables>;