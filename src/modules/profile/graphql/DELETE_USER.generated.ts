import * as Types from '../../../types/__generated__/graphql';

import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Delete_UserMutationVariables = Types.Exact<{ [key: string]: never; }>;


export type Delete_UserMutation = { DELETE_USER: { __typename: 'User', _id: string } };


export const Delete_UserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DELETE_USER"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"DELETE_USER"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}}]}}]} as unknown as DocumentNode<Delete_UserMutation, Delete_UserMutationVariables>;