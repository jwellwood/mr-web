import * as Types from '../../../types/__generated__/graphql';

import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Fetch_Org_SeasonsQueryVariables = Types.Exact<{
  orgId: Types.Scalars['String']['input'];
}>;


export type Fetch_Org_SeasonsQuery = { orgSeasons: Array<{ __typename: 'OrgSeason', _id: string, name: string, yearStarted: string, yearEnded: string, isCurrent: boolean, comment: string | null }> };


export const Fetch_Org_SeasonsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FETCH_ORG_SEASONS"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orgId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"orgSeasons"},"name":{"kind":"Name","value":"orgSeasons"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orgId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orgId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"yearStarted"}},{"kind":"Field","name":{"kind":"Name","value":"yearEnded"}},{"kind":"Field","name":{"kind":"Name","value":"isCurrent"}},{"kind":"Field","name":{"kind":"Name","value":"comment"}}]}}]}}]} as unknown as DocumentNode<Fetch_Org_SeasonsQuery, Fetch_Org_SeasonsQueryVariables>;