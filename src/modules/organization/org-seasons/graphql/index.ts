import { DeepOmitTypename } from '../../../../utils';
import { Add_Org_SeasonDocument, type Add_Org_SeasonMutation } from './ADD_ORG_SEASON.generated';
import {
  Delete_Org_SeasonDocument,
  type Delete_Org_SeasonMutation,
} from './DELETE_ORG_SEASON.generated';
import { Edit_Org_SeasonDocument, type Edit_Org_SeasonMutation } from './EDIT_ORG_SEASON.generated';
import { Fetch_Org_SeasonDocument, type Fetch_Org_SeasonQuery } from './FETCH_ORG_SEASON.generated';
import {
  Fetch_Org_SeasonsDocument,
  type Fetch_Org_SeasonsQuery,
} from './FETCH_ORG_SEASONS.generated';

export {
  Add_Org_SeasonDocument as ADD_ORG_SEASON,
  Edit_Org_SeasonDocument as EDIT_ORG_SEASON,
  Delete_Org_SeasonDocument as DELETE_ORG_SEASON,
  Fetch_Org_SeasonDocument as FETCH_ORG_SEASON,
  Fetch_Org_SeasonsDocument as FETCH_ORG_SEASONS,
};

export type T_FETCH_ORG_SEASON = DeepOmitTypename<Fetch_Org_SeasonQuery>;
export type T_FETCH_ORG_SEASONS = DeepOmitTypename<Fetch_Org_SeasonsQuery>;
export type T_ADD_ORG_SEASON = DeepOmitTypename<Add_Org_SeasonMutation>;
export type T_EDIT_ORG_SEASON = DeepOmitTypename<Edit_Org_SeasonMutation>;
export type T_DELETE_ORG_SEASON = DeepOmitTypename<Delete_Org_SeasonMutation>;
