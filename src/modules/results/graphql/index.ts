import { DeepOmitTypename } from '../../../utils';
import {
  Add_ResultDocument,
  type Add_ResultMutation,
  type Add_ResultMutationVariables,
} from './__generated__/ADD_RESULT.generated';
import {
  Batch_Confirm_ResultsDocument,
  type Batch_Confirm_ResultsMutation,
} from './__generated__/BATCH_CONFIRM_RESULTS.generated';
import {
  Delete_ResultDocument,
  type Delete_ResultMutation,
} from './__generated__/DELETE_RESULT.generated';
import {
  Edit_ResultDocument,
  type Edit_ResultMutation,
  type Edit_ResultMutationVariables,
} from './__generated__/EDIT_RESULT.generated';
import {
  Fetch_ResultDocument,
  type Fetch_ResultQuery,
} from './__generated__/FETCH_RESULT.generated';
import {
  Fetch_ResultsDocument,
  type Fetch_ResultsQuery,
} from './__generated__/FETCH_RESULTS.generated';

export {
  Fetch_ResultDocument as FETCH_RESULT,
  Fetch_ResultsDocument as FETCH_RESULTS,
  Add_ResultDocument as ADD_RESULT,
  Edit_ResultDocument as EDIT_RESULT,
  Delete_ResultDocument as DELETE_RESULT,
  Batch_Confirm_ResultsDocument as BATCH_CONFIRM_RESULTS,
};

export type T_FETCH_RESULT = DeepOmitTypename<Fetch_ResultQuery>;
export type T_FETCH_RESULTS = DeepOmitTypename<Fetch_ResultsQuery>;
export type T_ADD_RESULT = DeepOmitTypename<Add_ResultMutation>;
export type T_EDIT_RESULT = DeepOmitTypename<Edit_ResultMutation>;
export type T_ADD_RESULT_VARIABLES = Add_ResultMutationVariables;
export type T_EDIT_RESULT_VARIABLES = Edit_ResultMutationVariables;
export type T_DELETE_RESULT = DeepOmitTypename<Delete_ResultMutation>;
export type T_BATCH_CONFIRM_RESULTS = DeepOmitTypename<Batch_Confirm_ResultsMutation>;
