import { DeepOmitTypename } from '../../utils';

import { Add_MatchMutation } from './graphql/ADD_MATCH.generated';
import { Edit_MatchMutation } from './graphql/EDIT_MATCH.generated';
import { Delete_MatchMutation } from './graphql/DELETE_MATCH.generated';
import { Fetch_MatchQuery } from './graphql/FETCH_MATCH.generated';
import { Fetch_MatchesQuery } from './graphql/FETCH_MATCHES.generated';
import { Fetch_Matches_StatsQuery } from './graphql/FETCH_MATCHES_STATS.generated';
import { Fetch_Matches_All_Time_StatsQuery } from './graphql/FETCH_MATCHES_ALL_TIME_STATS.generated';
import { Fetch_Matches_By_OpponentQuery } from './graphql/FETCH_MATCHES_BY_OPPONENT.generated';
import { Fetch_Matches_RecordsQuery } from './graphql/FETCH_MATCHES_RECORDS.generated';
import { Fetch_Match_OpponentsQuery } from './graphql/FETCH_MATCH_OPPONENTS.generated';
import { Fetch_Players_For_Match_InputQuery } from './graphql/FETCH_PLAYERS_FOR_MATCH_INPUT.generated';

export type T_ADD_MATCH = DeepOmitTypename<Add_MatchMutation>;
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

export interface ITempMatch {
  _id: string;
  date: string; // > needs to be string in redux, but Date in form
  isHome: boolean;
  teamGoals: number;
  opponentGoals: number;
  leaguePosition: number | null;
  isForfeit: boolean;
  seasonId: string;
  // seasonId: {
  //   _id: string;
  // };
  competitionId: string;
  competitionName: string;
  // competitionId: { _id: string; name: string; competitionType: string };
  teamId: string;
  teamName: string;
  teamBadgeUrl: string | null;
  opponentId: string;
  opponentName: string;
  opponentBadgeUrl: string | null;
  // teamId: {
  //   _id: string;
  //   teamName: string;
  //   teamBadge: {
  //     public_id: string;
  //     url: string;
  //   } | null;
  // };

  // opponentId: {
  //   _id: string;
  //   teamName: string;
  //   teamBadge: {
  //     public_id: string;
  //     url: string;
  //   } | null;
  // };
}

export interface ITempMatchPlayers {
  playerName: string;
  playerId: string;
  matchPosition: string;
  // playerId: {
  //   _id: string;
  //   name: string;
  //   position: string;
  // };
  isStarter: boolean;
  goals: number;
  assists: number;
  pensScored: number;
  pensMissed: number;
  pensSaved: number;
  yellowCards: number;
  redCard: boolean;
  conceded: number;
  ownGoals: number;
  cleanSheet: boolean;
  mvp: boolean;
}
