import * as Types from '../../../types/__generated__/graphql';

import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Fetch_AwardQueryVariables = Types.Exact<{
  awardId: Types.Scalars['String']['input'];
}>;


export type Fetch_AwardQuery = { award: { __typename: 'Award', _id: string, awardName: string, awardValue: number | null, comment: string | null, winners: Array<{ __typename: 'Player', name: string, _id: string }> | null } };


export const Fetch_AwardDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FETCH_AWARD"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"awardId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"award"},"name":{"kind":"Name","value":"AWARD"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"awardId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"awardId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"awardName"}},{"kind":"Field","name":{"kind":"Name","value":"winners"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"awardValue"}},{"kind":"Field","name":{"kind":"Name","value":"comment"}}]}}]}}]} as unknown as DocumentNode<Fetch_AwardQuery, Fetch_AwardQueryVariables>;