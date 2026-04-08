import { DeepOmitTypename } from '../../../utils';
import { Add_AwardDocument, type Add_AwardMutation } from './ADD_AWARD.generated';
import { Delete_AwardDocument, type Delete_AwardMutation } from './DELETE_AWARD.generated';
import { Edit_AwardDocument, type Edit_AwardMutation } from './EDIT_AWARD.generated';
import { Fetch_AwardDocument, type Fetch_AwardQuery } from './FETCH_AWARD.generated';
import { Fetch_AwardsDocument, type Fetch_AwardsQuery } from './FETCH_AWARDS.generated';

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
export type T_FETCH_AWARD = DeepOmitTypename<Fetch_AwardQuery>;
export type T_FETCH_AWARDS = DeepOmitTypename<Fetch_AwardsQuery>;
