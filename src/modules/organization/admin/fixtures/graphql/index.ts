import { DeepOmitTypename } from '../../../../../utils';
import { Add_ResultDocument, type Add_ResultMutation } from './ADD_RESULT.generated';
import { Delete_ResultDocument, type Delete_ResultMutation } from './DELETE_RESULT.generated';
import { Edit_ResultDocument, type Edit_ResultMutation } from './EDIT_RESULT.generated';

export {
  Add_ResultDocument as ADD_RESULT,
  Edit_ResultDocument as EDIT_RESULT,
  Delete_ResultDocument as DELETE_RESULT,
};

export type T_ADD_RESULT = DeepOmitTypename<Add_ResultMutation>;
export type T_EDIT_RESULT = DeepOmitTypename<Edit_ResultMutation>;
export type T_DELETE_RESULT = DeepOmitTypename<Delete_ResultMutation>;
