import { DeepOmitTypename } from '../../../utils';
import {
  Fetch_Hall_Of_FameDocument,
  type Fetch_Hall_Of_FameQuery,
} from '../../squad/graphql/FETCH_HALL_OF_FAME.generated';
import {
  Fetch_Past_PlayersDocument,
  type Fetch_Past_PlayersQuery,
} from './FETCH_PAST_PLAYERS.generated';
import {
  Fetch_Squad_List_By_SeasonDocument,
  type Fetch_Squad_List_By_SeasonQuery,
} from './FETCH_SQUAD_LIST_BY_SEASON.generated';
import {
  Fetch_Squad_Record_Assists_In_MatchDocument,
  type Fetch_Squad_Record_Assists_In_MatchQuery,
} from './FETCH_SQUAD_RECORD_ASSISTS_IN_MATCH.generated';
import {
  Fetch_Squad_Record_Goals_In_MatchDocument,
  type Fetch_Squad_Record_Goals_In_MatchQuery,
} from './FETCH_SQUAD_RECORD_GOALS_IN_MATCH.generated';
import {
  Fetch_Squad_RecordsDocument,
  type Fetch_Squad_RecordsQuery,
} from './FETCH_SQUAD_RECORDS.generated';
import {
  Fetch_Squad_Single_Season_RecordsDocument,
  type Fetch_Squad_Single_Season_RecordsQuery,
} from './FETCH_SQUAD_SINGLE_SEASON_RECORDS.generated';
import {
  Fetch_Squad_StatsDocument,
  type Fetch_Squad_StatsQuery,
} from './FETCH_SQUAD_STATS.generated';
import {
  Fetch_Squad_StreaksDocument,
  type Fetch_Squad_StreaksQuery,
} from './FETCH_SQUAD_STREAKS.generated';
import {
  Fetch_Top_Player_StreaksDocument,
  type Fetch_Top_Player_StreaksQuery,
} from './FETCH_TOP_PLAYER_STREAKS.generated';

export {
  Fetch_Past_PlayersDocument as FETCH_PAST_PLAYERS,
  Fetch_Squad_List_By_SeasonDocument as FETCH_SQUAD_LIST_BY_SEASON,
  Fetch_Squad_Record_Assists_In_MatchDocument as FETCH_SQUAD_RECORD_ASSISTS_IN_MATCH,
  Fetch_Squad_Record_Goals_In_MatchDocument as FETCH_SQUAD_RECORD_GOALS_IN_MATCH,
  Fetch_Squad_RecordsDocument as FETCH_SQUAD_RECORDS,
  Fetch_Squad_Single_Season_RecordsDocument as FETCH_SQUAD_SINGLE_SEASON_RECORDS,
  Fetch_Squad_StatsDocument as FETCH_SQUAD_STATS,
  Fetch_Squad_StreaksDocument as FETCH_SQUAD_STREAKS,
  Fetch_Top_Player_StreaksDocument as FETCH_TOP_PLAYER_STREAKS,
  Fetch_Hall_Of_FameDocument as FETCH_HALL_OF_FAME,
};
// export types
export type T_FETCH_PAST_PLAYERS_QUERY = DeepOmitTypename<Fetch_Past_PlayersQuery>;
export type T_FETCH_SQUAD_LIST_BY_SEASON_QUERY = DeepOmitTypename<Fetch_Squad_List_By_SeasonQuery>;
export type T_FETCH_SQUAD_RECORD_ASSISTS_IN_MATCH_QUERY =
  DeepOmitTypename<Fetch_Squad_Record_Assists_In_MatchQuery>;
export type T_FETCH_SQUAD_RECORD_GOALS_IN_MATCH_QUERY =
  DeepOmitTypename<Fetch_Squad_Record_Goals_In_MatchQuery>;
export type T_FETCH_SQUAD_RECORDS_QUERY = DeepOmitTypename<Fetch_Squad_RecordsQuery>;
export type T_FETCH_SQUAD_SINGLE_SEASON_RECORDS_QUERY =
  DeepOmitTypename<Fetch_Squad_Single_Season_RecordsQuery>;
export type T_FETCH_SQUAD_STATS_QUERY = DeepOmitTypename<Fetch_Squad_StatsQuery>;
export type T_FETCH_SQUAD_STREAKS_QUERY = DeepOmitTypename<Fetch_Squad_StreaksQuery>;
export type T_FETCH_TOP_PLAYER_STREAKS_QUERY = DeepOmitTypename<Fetch_Top_Player_StreaksQuery>;
export type T_FETCH_HALL_OF_FAME = DeepOmitTypename<Fetch_Hall_Of_FameQuery>;
