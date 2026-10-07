import * as Types from '../../../types/__generated__/graphql';

import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Fetch_Org_TrophiesQueryVariables = Types.Exact<{
  orgSeasonId: Types.Scalars['String']['input'];
}>;


export type Fetch_Org_TrophiesQuery = { trophies: Array<{ __typename: 'OrgTrophyResponse', _id: string, competitionId: string, competitionName: string, winningTeamId: string, winningTeamName: string, runnerUpTeamId: string, runnerUpTeamName: string, year: string, comment: string | null }> };


export const Fetch_Org_TrophiesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FETCH_ORG_TROPHIES"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orgSeasonId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"trophies"},"name":{"kind":"Name","value":"ORG_TROPHIES_BY_SEASON"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orgSeasonId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orgSeasonId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"competitionId"}},{"kind":"Field","name":{"kind":"Name","value":"competitionName"}},{"kind":"Field","name":{"kind":"Name","value":"winningTeamId"}},{"kind":"Field","name":{"kind":"Name","value":"winningTeamName"}},{"kind":"Field","name":{"kind":"Name","value":"runnerUpTeamId"}},{"kind":"Field","name":{"kind":"Name","value":"runnerUpTeamName"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"comment"}}]}}]}}]} as unknown as DocumentNode<Fetch_Org_TrophiesQuery, Fetch_Org_TrophiesQueryVariables>;