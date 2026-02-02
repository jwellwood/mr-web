import * as Types from '../../../types/__generated__/graphql';

import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Log_Out_UserMutationVariables = Types.Exact<{ [key: string]: never; }>;


export type Log_Out_UserMutation = { user: { __typename: 'User', _id: string } };


export const Log_Out_UserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"LOG_OUT_USER"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"user"},"name":{"kind":"Name","value":"LOG_OUT_USER"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}}]}}]} as unknown as DocumentNode<Log_Out_UserMutation, Log_Out_UserMutationVariables>;