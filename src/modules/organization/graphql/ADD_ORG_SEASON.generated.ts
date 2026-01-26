import * as Types from '../../../types/__generated__/graphql';

import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Add_Org_SeasonMutationVariables = Types.Exact<{
  orgId: Types.Scalars['String']['input'];
  yearStarted: Types.Scalars['String']['input'];
  yearEnded: Types.Scalars['String']['input'];
  isCurrent: Types.Scalars['Boolean']['input'];
  comment?: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;


export type Add_Org_SeasonMutation = { season: { __typename: 'OrgSeason', _id: string } };


export const Add_Org_SeasonDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ADD_ORG_SEASON"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orgId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"yearStarted"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"yearEnded"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"isCurrent"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"comment"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"season"},"name":{"kind":"Name","value":"addOrgSeason"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orgId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orgId"}}},{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"yearStarted"},"value":{"kind":"Variable","name":{"kind":"Name","value":"yearStarted"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"yearEnded"},"value":{"kind":"Variable","name":{"kind":"Name","value":"yearEnded"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"isCurrent"},"value":{"kind":"Variable","name":{"kind":"Name","value":"isCurrent"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"comment"},"value":{"kind":"Variable","name":{"kind":"Name","value":"comment"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}}]}}]} as unknown as DocumentNode<Add_Org_SeasonMutation, Add_Org_SeasonMutationVariables>;