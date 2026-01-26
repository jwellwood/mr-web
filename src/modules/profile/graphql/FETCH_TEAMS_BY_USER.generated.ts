import * as Types from '../../../types/__generated__/graphql';

import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Fetch_Teams_By_UserQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type Fetch_Teams_By_UserQuery = { teams: Array<{ __typename: 'Team', _id: string, teamName: string, country: string | null, isActive: boolean, teamBadge: { __typename: 'UploadedImage', public_id: string, url: string } | null, orgId: { __typename: 'Organization', _id: string } }> };


export const Fetch_Teams_By_UserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FETCH_TEAMS_BY_USER"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"teams"},"name":{"kind":"Name","value":"userTeams"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"teamName"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"teamBadge"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"public_id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"orgId"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}}]}}]}}]} as unknown as DocumentNode<Fetch_Teams_By_UserQuery, Fetch_Teams_By_UserQueryVariables>;