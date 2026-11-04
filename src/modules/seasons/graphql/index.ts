import { DeepOmitTypename } from '../../../utils';
import {
  Add_Org_SeasonDocument,
  type Add_Org_SeasonMutation,
  type Add_Org_SeasonMutationVariables,
} from './__generated__/ADD_ORG_SEASON.generated';
import {
  Delete_Org_SeasonDocument,
  type Delete_Org_SeasonMutation,
} from './__generated__/DELETE_ORG_SEASON.generated';
import {
  Edit_Org_SeasonDocument,
  type Edit_Org_SeasonMutation,
  type Edit_Org_SeasonMutationVariables,
} from './__generated__/EDIT_ORG_SEASON.generated';
import {
  Fetch_Org_SeasonDocument,
  type Fetch_Org_SeasonQuery,
} from './__generated__/FETCH_ORG_SEASON.generated';
import {
  Fetch_Org_SeasonsDocument,
  type Fetch_Org_SeasonsQuery,
} from './__generated__/FETCH_ORG_SEASONS.generated';
import {
  Update_Competition_ConfigsDocument,
  type Update_Competition_ConfigsMutation,
  type Update_Competition_ConfigsMutationVariables,
} from './__generated__/UPDATE_COMP_CONFIGS.generated';

export {
  Fetch_Org_SeasonDocument as FETCH_ORG_SEASON,
  Fetch_Org_SeasonsDocument as FETCH_ORG_SEASONS,
  Add_Org_SeasonDocument as ADD_ORG_SEASON,
  Edit_Org_SeasonDocument as EDIT_ORG_SEASON,
  Delete_Org_SeasonDocument as DELETE_ORG_SEASON,
  Update_Competition_ConfigsDocument as UPDATE_COMPETITION_CONFIGS,
};

export type T_FETCH_ORG_SEASON = DeepOmitTypename<Fetch_Org_SeasonQuery>;
export type T_FETCH_ORG_SEASONS = DeepOmitTypename<Fetch_Org_SeasonsQuery>;
export type T_ADD_ORG_SEASON = DeepOmitTypename<Add_Org_SeasonMutation>;
export type T_EDIT_ORG_SEASON = DeepOmitTypename<Edit_Org_SeasonMutation>;
export type T_ADD_ORG_SEASON_VARIABLES = Add_Org_SeasonMutationVariables;
export type T_EDIT_ORG_SEASON_VARIABLES = Edit_Org_SeasonMutationVariables;
export type T_DELETE_ORG_SEASON = DeepOmitTypename<Delete_Org_SeasonMutation>;
export type T_UPDATE_COMPETITION_CONFIGS = DeepOmitTypename<Update_Competition_ConfigsMutation>;
export type T_UPDATE_COMPETITION_CONFIGS_VARIABLES = Update_Competition_ConfigsMutationVariables;
