import * as Types from '../../../types/__generated__/graphql';

import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Update_Competition_ConfigsMutationVariables = Types.Exact<{
  orgId: Types.Scalars['String']['input'];
  seasonId: Types.Scalars['String']['input'];
  competitionConfigs: Array<Types.CompetitionConfigInput> | Types.CompetitionConfigInput;
}>;


export type Update_Competition_ConfigsMutation = { UPDATE_COMPETITION_CONFIGS: { __typename: 'OrgSeason', _id: string } };


export const Update_Competition_ConfigsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UPDATE_COMPETITION_CONFIGS"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orgId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"seasonId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"competitionConfigs"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CompetitionConfigInput"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"UPDATE_COMPETITION_CONFIGS"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orgId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orgId"}}},{"kind":"Argument","name":{"kind":"Name","value":"seasonId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"seasonId"}}},{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"competitionConfigs"},"value":{"kind":"Variable","name":{"kind":"Name","value":"competitionConfigs"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}}]}}]} as unknown as DocumentNode<Update_Competition_ConfigsMutation, Update_Competition_ConfigsMutationVariables>;