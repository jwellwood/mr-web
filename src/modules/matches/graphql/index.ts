import { DeepOmitTypename } from '../../../utils';
import {
  Add_MatchDocument,
  type Add_MatchMutation,
  type Add_MatchMutationVariables,
} from './__generated__/ADD_MATCH.generated';
import {
  Delete_MatchDocument,
  type Delete_MatchMutation,
} from './__generated__/DELETE_MATCH.generated';
import { Edit_MatchDocument, type Edit_MatchMutation } from './__generated__/EDIT_MATCH.generated';
import { Fetch_MatchDocument, type Fetch_MatchQuery } from './__generated__/FETCH_MATCH.generated';
import {
  Fetch_Match_OpponentsDocument,
  type Fetch_Match_OpponentsQuery,
} from './__generated__/FETCH_MATCH_OPPONENTS.generated';
import {
  Fetch_MatchesDocument,
  type Fetch_MatchesQuery,
} from './__generated__/FETCH_MATCHES.generated';
import {
  Fetch_Matches_All_Time_StatsDocument,
  type Fetch_Matches_All_Time_StatsQuery,
} from './__generated__/FETCH_MATCHES_ALL_TIME_STATS.generated';
import {
  Fetch_Matches_By_OpponentDocument,
  type Fetch_Matches_By_OpponentQuery,
} from './__generated__/FETCH_MATCHES_BY_OPPONENT.generated';
import {
  Fetch_Matches_RecordsDocument,
  type Fetch_Matches_RecordsQuery,
} from './__generated__/FETCH_MATCHES_RECORDS.generated';
import {
  Fetch_Matches_StatsDocument,
  type Fetch_Matches_StatsQuery,
} from './__generated__/FETCH_MATCHES_STATS.generated';
import {
  Fetch_Matches_StreaksDocument,
  type Fetch_Matches_StreaksQuery,
} from './__generated__/FETCH_MATCHES_STREAKS.generated';
import {
  Fetch_Players_For_Match_InputDocument,
  type Fetch_Players_For_Match_InputQuery,
} from './__generated__/FETCH_PLAYERS_FOR_MATCH_INPUT.generated';

export {
  Add_MatchDocument as ADD_MATCH,
  Edit_MatchDocument as EDIT_MATCH,
  Delete_MatchDocument as DELETE_MATCH,
  Fetch_MatchDocument as FETCH_MATCH,
  Fetch_MatchesDocument as FETCH_MATCHES,
  Fetch_Matches_StatsDocument as FETCH_MATCHES_STATS,
  Fetch_Matches_All_Time_StatsDocument as FETCH_MATCHES_ALL_TIME_STATS,
  Fetch_Matches_By_OpponentDocument as FETCH_MATCHES_BY_OPPONENT,
  Fetch_Matches_RecordsDocument as FETCH_MATCHES_RECORDS,
  Fetch_Match_OpponentsDocument as FETCH_MATCH_OPPONENTS,
  Fetch_Players_For_Match_InputDocument as FETCH_PLAYERS_FOR_MATCH_INPUT,
  Fetch_Matches_StreaksDocument as FETCH_MATCHES_STREAK,
};

export type T_ADD_MATCH = DeepOmitTypename<Add_MatchMutation>;
export type T_ADD_MATCH_VARIABLES = Add_MatchMutationVariables;
export type T_EDIT_MATCH = DeepOmitTypename<Edit_MatchMutation>;
export type T_DELETE_MATCH = DeepOmitTypename<Delete_MatchMutation>;
export type T_FETCH_MATCH = DeepOmitTypename<Fetch_MatchQuery>;
export type T_FETCH_MATCHES = DeepOmitTypename<Fetch_MatchesQuery>;
export type T_FETCH_MATCHES_STATS = DeepOmitTypename<Fetch_Matches_StatsQuery>;
export type T_FETCH_MATCHES_ALL_TIME_STATS = DeepOmitTypename<Fetch_Matches_All_Time_StatsQuery>;
export type T_FETCH_MATCHES_BY_OPPONENT = DeepOmitTypename<Fetch_Matches_By_OpponentQuery>;
export type T_FETCH_MATCHES_RECORDS = DeepOmitTypename<Fetch_Matches_RecordsQuery>;
export type T_FETCH_MATCH_OPPONENTS = DeepOmitTypename<Fetch_Match_OpponentsQuery>;
export type T_FETCH_PLAYERS_FOR_MATCH_INPUT = DeepOmitTypename<Fetch_Players_For_Match_InputQuery>;
export type T_FETCH_MATCHES_STREAK = DeepOmitTypename<Fetch_Matches_StreaksQuery>;
