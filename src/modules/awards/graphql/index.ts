import { DeepOmitTypename } from '../../../utils';
import { Add_AwardDocument, type Add_AwardMutation } from './__generated__/ADD_AWARD.generated';
import {
  Delete_AwardDocument,
  type Delete_AwardMutation,
} from './__generated__/DELETE_AWARD.generated';
import {
  Edit_AwardDocument,
  type Edit_AwardMutation,
  type Edit_AwardMutationVariables,
} from './__generated__/EDIT_AWARD.generated';
import { Fetch_AwardDocument, type Fetch_AwardQuery } from './__generated__/FETCH_AWARD.generated';
import {
  Fetch_AwardsDocument,
  type Fetch_AwardsQuery,
} from './__generated__/FETCH_AWARDS.generated';

export {
  Add_AwardDocument as ADD_AWARD,
  Delete_AwardDocument as DELETE_AWARD,
  Edit_AwardDocument as EDIT_AWARD,
  Fetch_AwardDocument as FETCH_AWARD,
  Fetch_AwardsDocument as FETCH_AWARDS,
};

export type T_ADD_AWARD = DeepOmitTypename<Add_AwardMutation>;
export type T_DELETE_AWARD = DeepOmitTypename<Delete_AwardMutation>;
export type T_EDIT_AWARD = DeepOmitTypename<Edit_AwardMutation>;
export type T_EDIT_AWARD_VARIABLES = Edit_AwardMutationVariables;
export type T_FETCH_AWARD = DeepOmitTypename<Fetch_AwardQuery>;
export type T_FETCH_AWARDS = DeepOmitTypename<Fetch_AwardsQuery>;
