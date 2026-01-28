import { DeepOmitTypename } from '../../utils';

import { type Fetch_Awards_By_PlayerQuery } from './graphql/FETCH_AWARDS_BY_PLAYER.generated';
import { type Fetch_PlayerQuery } from './graphql/FETCH_PLAYER.generated';
import { type Fetch_Player_StatsQuery } from './graphql/FETCH_PLAYER_STATS.generated';
import { type Fetch_Player_StreaksQuery } from './graphql/FETCH_PLAYER_STREAKS.generated';
import { type Fetch_Player_Opponent_StatsQuery } from './graphql/FETCH_PLAYER_OPPONENT_STATS.generated';
import { type Fetch_Player_TrophiesQuery } from './graphql/FETCH_PLAYER_TROPHIES.generated';
import { type Fetch_Player_Match_RecordsQuery } from './graphql/FETCH_PLAYER_MATCH_RECORDS.generated';
import { type Fetch_Player_Matches_With_Record_AssistsQuery } from './graphql/FETCH_PLAYER_MATCHES_WITH_RECORD_ASSISTS.generated';
import { type Fetch_Player_Matches_With_Record_GoalsQuery } from './graphql/FETCH_PLAYER_MATCHES_WITH_RECORD_GOALS.generated';
import { type Fetch_Player_Matches_With_Record_CombinedQuery } from './graphql/FETCH_PLAYER_MATCHES_WITH_RECORD_COMBINED.generated';
import { type Fetch_Player_Seasons_SummaryQuery } from './graphql/FETCH_PLAYER_SEASON_SUMMARY.generated';

export type T_FETCH_PLAYER = DeepOmitTypename<Fetch_PlayerQuery>;
export type T_FETCH_PLAYER_STATS = DeepOmitTypename<Fetch_Player_StatsQuery>;
export type T_FETCH_PLAYER_STREAKS = DeepOmitTypename<Fetch_Player_StreaksQuery>;
export type T_FETCH_PLAYER_OPPONENT_STATS = DeepOmitTypename<Fetch_Player_Opponent_StatsQuery>;
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
