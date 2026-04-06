import { DeepOmitTypename } from '../../../utils';
import { Add_PlayerDocument, type Add_PlayerMutation } from './ADD_PLAYER.generated';
import { Delete_PlayerDocument, type Delete_PlayerMutation } from './DELETE_PLAYER.generated';
import { Edit_PlayerDocument, type Edit_PlayerMutation } from './EDIT_PLAYER.generated';
import {
  Edit_Player_PhotoDocument,
  type Edit_Player_PhotoMutation,
} from './EDIT_PLAYER_PHOTO.generated';
import {
  Fetch_Awards_By_PlayerDocument,
  type Fetch_Awards_By_PlayerQuery,
} from './FETCH_AWARDS_BY_PLAYER.generated';
import { Fetch_PlayerDocument, type Fetch_PlayerQuery } from './FETCH_PLAYER.generated';
import {
  Fetch_Player_Match_RecordsDocument,
  type Fetch_Player_Match_RecordsQuery,
} from './FETCH_PLAYER_MATCH_RECORDS.generated';
import {
  Fetch_Player_Matches_By_OpponentDocument,
  type Fetch_Player_Matches_By_OpponentQuery,
} from './FETCH_PLAYER_MATCHES_BY_OPPONENT.generated';
import {
  Fetch_Player_Matches_With_Record_AssistsDocument,
  type Fetch_Player_Matches_With_Record_AssistsQuery,
} from './FETCH_PLAYER_MATCHES_WITH_RECORD_ASSISTS.generated';
import {
  Fetch_Player_Matches_With_Record_CombinedDocument,
  type Fetch_Player_Matches_With_Record_CombinedQuery,
} from './FETCH_PLAYER_MATCHES_WITH_RECORD_COMBINED.generated';
import {
  Fetch_Player_Matches_With_Record_GoalsDocument,
  type Fetch_Player_Matches_With_Record_GoalsQuery,
} from './FETCH_PLAYER_MATCHES_WITH_RECORD_GOALS.generated';
import {
  Fetch_Player_Opponent_StatsDocument,
  type Fetch_Player_Opponent_StatsQuery,
} from './FETCH_PLAYER_OPPONENT_STATS.generated';
import {
  Fetch_Player_Seasons_SummaryDocument,
  type Fetch_Player_Seasons_SummaryQuery,
} from './FETCH_PLAYER_SEASON_SUMMARY.generated';
import {
  Fetch_Player_StatsDocument,
  type Fetch_Player_StatsQuery,
} from './FETCH_PLAYER_STATS.generated';
import {
  Fetch_Player_StreaksDocument,
  type Fetch_Player_StreaksQuery,
} from './FETCH_PLAYER_STREAKS.generated';
import {
  Fetch_Player_TrophiesDocument,
  type Fetch_Player_TrophiesQuery,
} from './FETCH_PLAYER_TROPHIES.generated';

export {
  Add_PlayerDocument as ADD_PLAYER,
  Delete_PlayerDocument as DELETE_PLAYER,
  Edit_Player_PhotoDocument as EDIT_PLAYER_PHOTO,
  Edit_PlayerDocument as EDIT_PLAYER,
  Fetch_Awards_By_PlayerDocument as FETCH_AWARDS_BY_PLAYER,
  Fetch_Player_Match_RecordsDocument as FETCH_PLAYER_MATCH_RECORDS,
  Fetch_Player_Matches_By_OpponentDocument as FETCH_PLAYER_MATCHES_BY_OPPONENT,
  Fetch_Player_Matches_With_Record_AssistsDocument as FETCH_PLAYER_MATCHES_WITH_RECORD_ASSISTS,
  Fetch_Player_Matches_With_Record_CombinedDocument as FETCH_PLAYER_MATCHES_WITH_RECORD_COMBINED,
  Fetch_Player_Matches_With_Record_GoalsDocument as FETCH_PLAYER_MATCHES_WITH_RECORD_GOALS,
  Fetch_Player_Opponent_StatsDocument as FETCH_PLAYER_OPPONENT_STATS,
  Fetch_Player_Seasons_SummaryDocument as FETCH_PLAYER_SEASONS_SUMMARY,
  Fetch_Player_StatsDocument as FETCH_PLAYER_STATS,
  Fetch_Player_StreaksDocument as FETCH_PLAYER_STREAKS,
  Fetch_Player_TrophiesDocument as FETCH_PLAYER_TROPHIES,
  Fetch_PlayerDocument as FETCH_PLAYER,
};
// export types
export type T_ADD_PLAYER_MUTATION = DeepOmitTypename<Add_PlayerMutation>;
export type T_DELETE_PLAYER_MUTATION = DeepOmitTypename<Delete_PlayerMutation>;
export type T_EDIT_PLAYER_MUTATION = DeepOmitTypename<Edit_PlayerMutation>;
export type T_EDIT_PLAYER_PHOTO_MUTATION = DeepOmitTypename<Edit_Player_PhotoMutation>;
export type T_FETCH_PLAYER = DeepOmitTypename<Fetch_PlayerQuery>;
export type T_FETCH_PLAYER_STATS = DeepOmitTypename<Fetch_Player_StatsQuery>;
export type T_FETCH_PLAYER_STREAKS = DeepOmitTypename<Fetch_Player_StreaksQuery>;
export type T_FETCH_PLAYER_OPPONENT_STATS = DeepOmitTypename<Fetch_Player_Opponent_StatsQuery>;
export type T_FETCH_PLAYER_MATCHES_BY_OPPONENT =
  DeepOmitTypename<Fetch_Player_Matches_By_OpponentQuery>;
export type T_FETCH_PLAYER_TROPHIES = DeepOmitTypename<Fetch_Player_TrophiesQuery>;
export type T_FETCH_PLAYER_MATCH_RECORDS = DeepOmitTypename<Fetch_Player_Match_RecordsQuery>;
export type T_FETCH_PLAYER_MATCHES_WITH_RECORD_ASSISTS =
  DeepOmitTypename<Fetch_Player_Matches_With_Record_AssistsQuery>;
export type T_FETCH_PLAYER_MATCHES_WITH_RECORD_GOALS =
  DeepOmitTypename<Fetch_Player_Matches_With_Record_GoalsQuery>;
export type T_FETCH_PLAYER_MATCHES_WITH_RECORD_COMBINED =
  DeepOmitTypename<Fetch_Player_Matches_With_Record_CombinedQuery>;
export type T_FETCH_PLAYER_SEASONS_SUMMARY = DeepOmitTypename<Fetch_Player_Seasons_SummaryQuery>;
export type T_FETCH_AWARDS_BY_PLAYER = DeepOmitTypename<Fetch_Awards_By_PlayerQuery>;

export type T_PLAYER_MATCH_WITH_RECORD =
  | T_FETCH_PLAYER_MATCHES_WITH_RECORD_GOALS
  | T_FETCH_PLAYER_MATCHES_WITH_RECORD_ASSISTS
  | T_FETCH_PLAYER_MATCHES_WITH_RECORD_COMBINED;
