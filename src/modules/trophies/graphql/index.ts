import { DeepOmitTypename } from '../../../utils';
import { Add_Org_TrophyDocument, type Add_Org_TrophyMutation } from './ADD_ORG_TROPHY.generated';
import { Add_TrophyDocument, type Add_TrophyMutation } from './ADD_TROPHY.generated';
import {
  Delete_Org_TrophyDocument,
  type Delete_Org_TrophyMutation,
} from './DELETE_ORG_TROPHY.generated';
import { Delete_TrophyDocument, type Delete_TrophyMutation } from './DELETE_TROPHY.generated';
import { Edit_Org_TrophyDocument, type Edit_Org_TrophyMutation } from './EDIT_ORG_TROPHY.generated';
import { Edit_TrophyDocument, type Edit_TrophyMutation } from './EDIT_TROPHY.generated';
import {
  Fetch_Org_TrophiesDocument,
  type Fetch_Org_TrophiesQuery,
} from './FETCH_ORG_TROPHIES.generated';
import { Fetch_TrophiesDocument, type Fetch_TrophiesQuery } from './FETCH_TROPHIES.generated';
import { Fetch_TrophyDocument, type Fetch_TrophyQuery } from './FETCH_TROPHY.generated';

export {
  Add_Org_TrophyDocument as ADD_ORG_TROPHY,
  Add_TrophyDocument as ADD_TROPHY,
  Delete_Org_TrophyDocument as DELETE_ORG_TROPHY,
  Delete_TrophyDocument as DELETE_TROPHY,
  Edit_Org_TrophyDocument as EDIT_ORG_TROPHY,
  Edit_TrophyDocument as EDIT_TROPHY,
  Fetch_Org_TrophiesDocument as FETCH_ORG_TROPHIES,
  Fetch_TrophiesDocument as FETCH_TROPHIES,
  Fetch_TrophyDocument as FETCH_TROPHY,
};

export type T_ADD_ORG_TROPHY = DeepOmitTypename<Add_Org_TrophyMutation>;
export type T_ADD_TROPHY = DeepOmitTypename<Add_TrophyMutation>;
export type T_DELETE_ORG_TROPHY = DeepOmitTypename<Delete_Org_TrophyMutation>;
export type T_DELETE_TROPHY = DeepOmitTypename<Delete_TrophyMutation>;
export type T_EDIT_ORG_TROPHY = DeepOmitTypename<Edit_Org_TrophyMutation>;
export type T_EDIT_TROPHY = DeepOmitTypename<Edit_TrophyMutation>;
export type T_FETCH_ORG_TROPHIES = DeepOmitTypename<Fetch_Org_TrophiesQuery>;
export type T_FETCH_TROPHIES = DeepOmitTypename<Fetch_TrophiesQuery>;
export type T_FETCH_TROPHY = DeepOmitTypename<Fetch_TrophyQuery>;
