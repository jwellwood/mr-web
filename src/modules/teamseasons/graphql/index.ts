import { DeepOmitTypename } from '../../../utils';
import { Add_SeasonDocument, type Add_SeasonMutation } from './ADD_SEASON.generated';
import { Delete_SeasonDocument, type Delete_SeasonMutation } from './DELETE_SEASON.generated';
import { Edit_SeasonDocument, type Edit_SeasonMutation } from './EDIT_SEASON.generated';
import { Fetch_SeasonDocument, type Fetch_SeasonQuery } from './FETCH_SEASON.generated';
import { Fetch_SeasonsDocument, type Fetch_SeasonsQuery } from './FETCH_SEASONS.generated';
import {
  Fetch_Seasons_PositionDocument,
  type Fetch_Seasons_PositionQuery,
} from './FETCH_SEASONS_POSITION.generated';

export {
  Fetch_SeasonDocument as FETCH_SEASON,
  Fetch_SeasonsDocument as FETCH_SEASONS,
  Add_SeasonDocument as ADD_SEASON,
  Edit_SeasonDocument as EDIT_SEASON,
  Delete_SeasonDocument as DELETE_SEASON,
  Fetch_Seasons_PositionDocument as FETCH_SEASONS_POSITION,
};

export type T_ADD_SEASON = DeepOmitTypename<Add_SeasonMutation>;
export type T_DELETE_SEASON = DeepOmitTypename<Delete_SeasonMutation>;
export type T_EDIT_SEASON = DeepOmitTypename<Edit_SeasonMutation>;
export type T_FETCH_SEASON = DeepOmitTypename<Fetch_SeasonQuery>;
export type T_FETCH_SEASONS_POSITION = DeepOmitTypename<Fetch_Seasons_PositionQuery>;
export type T_FETCH_SEASONS = DeepOmitTypename<Fetch_SeasonsQuery>;
