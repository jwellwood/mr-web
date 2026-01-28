import { DeepOmitTypename } from '../../utils';

import { type Fetch_Squad_List_By_SeasonQuery } from './graphql/FETCH_SQUAD_LIST_BY_SEASON.generated';
import { type Fetch_Squad_StatsQuery } from './graphql/FETCH_SQUAD_STATS.generated';
import { type Fetch_Past_PlayersQuery } from './graphql/FETCH_PAST_PLAYERS.generated';
import { type Fetch_Squad_RecordsQuery } from './graphql/FETCH_SQUAD_RECORDS.generated';
import { type Fetch_Squad_StreaksQuery } from './graphql/FETCH_SQUAD_STREAKS.generated';
import { type Fetch_Squad_Record_Goals_In_MatchQuery } from './graphql/FETCH_SQUAD_RECORD_GOALS_IN_MATCH.generated';
import { type Fetch_Squad_Record_Assists_In_MatchQuery } from './graphql/FETCH_SQUAD_RECORD_ASSISTS_IN_MATCH.generated';
import { type Fetch_Squad_Single_Season_RecordsQuery } from './graphql/FETCH_SQUAD_SINGLE_SEASON_RECORDS.generated';

export type FETCH_SQUAD_RECORD_ASSISTS_IN_MATCH_QUERY =
  DeepOmitTypename<Fetch_Squad_Record_Assists_In_MatchQuery>;
export type FETCH_SQUAD_SINGLE_SEASON_RECORDS_QUERY =
  DeepOmitTypename<Fetch_Squad_Single_Season_RecordsQuery>;
export type FETCH_SQUAD_RECORD_GOALS_IN_MATCH_QUERY =
  DeepOmitTypename<Fetch_Squad_Record_Goals_In_MatchQuery>;
export type FETCH_SQUAD_STREAKS_QUERY = DeepOmitTypename<Fetch_Squad_StreaksQuery>;
export type FETCH_SQUAD_RECORDS_QUERY = DeepOmitTypename<Fetch_Squad_RecordsQuery>;
export type FETCH_SQUAD_LIST_BY_SEASON_QUERY = DeepOmitTypename<Fetch_Squad_List_By_SeasonQuery>;
export type FETCH_SQUAD_STATS_QUERY = DeepOmitTypename<Fetch_Squad_StatsQuery>;
export type FETCH_PAST_PLAYERS_QUERY = DeepOmitTypename<Fetch_Past_PlayersQuery>;
