import { DeepOmitTypename } from '../../utils';

import { Add_AwardMutation } from './graphql/ADD_AWARD.generated';
import { Add_SeasonMutation } from './graphql/ADD_SEASON.generated';
import { Add_TrophyMutation } from './graphql/ADD_TROPHY.generated';
import { Delete_AwardMutation } from './graphql/DELETE_AWARD.generated';
import { Delete_SeasonMutation } from './graphql/DELETE_SEASON.generated';
import { Delete_TrophyMutation } from './graphql/DELETE_TROPHY.generated';
import { Edit_AwardMutation } from './graphql/EDIT_AWARD.generated';
import { Edit_SeasonMutation } from './graphql/EDIT_SEASON.generated';
import { Edit_TrophyMutation } from './graphql/EDIT_TROPHY.generated';
import { Fetch_AwardQuery } from './graphql/FETCH_AWARD.generated';
import { Fetch_AwardsQuery } from './graphql/FETCH_AWARDS.generated';
import { Fetch_Hall_Of_FameQuery } from './graphql/FETCH_HALL_OF_FAME.generated';
import { Fetch_SeasonQuery } from './graphql/FETCH_SEASON.generated';
import { Fetch_Seasons_PositionQuery } from './graphql/FETCH_SEASONS_POSITION.generated';
import { Fetch_SeasonsQuery } from './graphql/FETCH_SEASONS.generated';
import { Fetch_TrophiesQuery } from './graphql/FETCH_TROPHIES.generated';
import { Fetch_TrophyQuery } from './graphql/FETCH_TROPHY.generated';

export type T_ADD_AWARD = DeepOmitTypename<Add_AwardMutation>;
export type T_ADD_SEASON = DeepOmitTypename<Add_SeasonMutation>;
export type T_ADD_TROPHY = DeepOmitTypename<Add_TrophyMutation>;
export type T_DELETE_AWARD = DeepOmitTypename<Delete_AwardMutation>;
export type T_DELETE_SEASON = DeepOmitTypename<Delete_SeasonMutation>;
export type T_DELETE_TROPHY = DeepOmitTypename<Delete_TrophyMutation>;
export type T_EDIT_AWARD = DeepOmitTypename<Edit_AwardMutation>;
export type T_EDIT_SEASON = DeepOmitTypename<Edit_SeasonMutation>;
export type T_EDIT_TROPHY = DeepOmitTypename<Edit_TrophyMutation>;
export type T_FETCH_AWARD = DeepOmitTypename<Fetch_AwardQuery>;
export type T_FETCH_AWARDS = DeepOmitTypename<Fetch_AwardsQuery>;
export type T_FETCH_HALL_OF_FAME = DeepOmitTypename<Fetch_Hall_Of_FameQuery>;
export type T_FETCH_SEASON = DeepOmitTypename<Fetch_SeasonQuery>;
export type T_FETCH_SEASONS_POSITION = DeepOmitTypename<Fetch_Seasons_PositionQuery>;
export type T_FETCH_SEASONS = DeepOmitTypename<Fetch_SeasonsQuery>;
export type T_FETCH_TROPHIES = DeepOmitTypename<Fetch_TrophiesQuery>;
export type T_FETCH_TROPHY = DeepOmitTypename<Fetch_TrophyQuery>;

export interface ITrophyTotals {
  total: number;
  winner: number;
  final: number;
}
