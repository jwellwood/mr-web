export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /**
   * A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the
   * `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO
   * 8601 standard for representation of dates and times using the Gregorian
   * calendar.This scalar is serialized to a string in ISO 8601 format and parsed
   * from a string in ISO 8601 format.
   */
  DateTimeISO: { input: any; output: any; }
};

export type AddAwardInput = {
  awardName: Scalars['String']['input'];
  awardValue?: InputMaybe<Scalars['Float']['input']>;
  comment?: InputMaybe<Scalars['String']['input']>;
  winners: Array<Scalars['String']['input']>;
};

export type AddOrgSeasonInput = {
  comment?: InputMaybe<Scalars['String']['input']>;
  isCurrent: Scalars['Boolean']['input'];
  yearEnded: Scalars['String']['input'];
  yearStarted: Scalars['String']['input'];
};

export type AddOrganizationInput = {
  city?: InputMaybe<Scalars['String']['input']>;
  country?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  website?: InputMaybe<Scalars['String']['input']>;
  yearFounded?: InputMaybe<Scalars['String']['input']>;
};

export type AddPlayerInput = {
  dateOfBirth?: InputMaybe<Scalars['String']['input']>;
  isCaptain: Scalars['Boolean']['input'];
  isHallOfFame: Scalars['Boolean']['input'];
  isViceCaptain: Scalars['Boolean']['input'];
  name: Scalars['String']['input'];
  nationality?: InputMaybe<Scalars['String']['input']>;
  position: Scalars['String']['input'];
  seasonIds: Array<Scalars['String']['input']>;
  squadNumber: Scalars['String']['input'];
  yearJoined: Scalars['String']['input'];
};

export type AddResultInput = {
  awayGoals: Scalars['Float']['input'];
  awayTeam: Scalars['ID']['input'];
  competitionId: Scalars['ID']['input'];
  date: Scalars['String']['input'];
  gameWeek: Scalars['Float']['input'];
  homeGoals: Scalars['Float']['input'];
  homeTeam: Scalars['ID']['input'];
  orgSeasonId: Scalars['ID']['input'];
};

export type AddTeamInput = {
  country?: InputMaybe<Scalars['String']['input']>;
  isActive: Scalars['Boolean']['input'];
  location?: InputMaybe<Scalars['String']['input']>;
  teamName: Scalars['String']['input'];
  yearFounded?: InputMaybe<Scalars['String']['input']>;
};

export type AddTeamSeasonInput = {
  comment?: InputMaybe<Scalars['String']['input']>;
  division?: InputMaybe<Scalars['String']['input']>;
  leaguePosition?: InputMaybe<Scalars['Float']['input']>;
  totalFinalPositions?: InputMaybe<Scalars['Float']['input']>;
  yearEnded: Scalars['String']['input'];
  yearStarted: Scalars['String']['input'];
};

export type AddTrophyInput = {
  comment?: InputMaybe<Scalars['String']['input']>;
  isFinal: Scalars['Boolean']['input'];
  isWinner: Scalars['Boolean']['input'];
  name: Scalars['String']['input'];
  opponent?: InputMaybe<Scalars['String']['input']>;
  seasonId: Scalars['String']['input'];
  year: Scalars['String']['input'];
};

export type AllPlayerStreaks = {
  __typename?: 'AllPlayerStreaks';
  longestPlayedStreak: Scalars['Float']['output'];
  playerId: Scalars['String']['output'];
};

export type Award = {
  __typename?: 'Award';
  _id: Scalars['ID']['output'];
  awardName: Scalars['String']['output'];
  awardValue?: Maybe<Scalars['Float']['output']>;
  comment?: Maybe<Scalars['String']['output']>;
  seasonId: TeamSeason;
  winners?: Maybe<Array<Player>>;
};

export type AwardByPlayer = {
  __typename?: 'AwardByPlayer';
  _id: Scalars['String']['output'];
  awardName: Scalars['String']['output'];
  awardValue?: Maybe<Scalars['Float']['output']>;
  comment?: Maybe<Scalars['String']['output']>;
  season: Scalars['String']['output'];
};

/** The Competition model */
export type Competition = {
  __typename?: 'Competition';
  _id: Scalars['ID']['output'];
  competitionType: Scalars['String']['output'];
  isActive: Scalars['Boolean']['output'];
  matchMinutes: Scalars['Float']['output'];
  name: Scalars['String']['output'];
  orgId: Scalars['ID']['output'];
  playersPerTeam: Scalars['Float']['output'];
  winners: Array<CompetitionWinner>;
};

export type CompetitionInput = {
  competitionType: Scalars['String']['input'];
  isActive: Scalars['Boolean']['input'];
  matchMinutes: Scalars['Float']['input'];
  name: Scalars['String']['input'];
  playersPerTeam: Scalars['Float']['input'];
};

export type CompetitionWinner = {
  __typename?: 'CompetitionWinner';
  isRunnerUp: Scalars['Boolean']['output'];
  isWinner: Scalars['Boolean']['output'];
  teamId: Team;
  year: Scalars['String']['output'];
};

export type EditBadgeInput = {
  public_id: Scalars['String']['input'];
  url: Scalars['String']['input'];
};

export type EditImageInput = {
  public_id: Scalars['String']['input'];
  url: Scalars['String']['input'];
};

export type EditOrgBadgeInput = {
  public_id: Scalars['String']['input'];
  url: Scalars['String']['input'];
};

export type EditPasswordInput = {
  newPassword: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type EditPhotoInput = {
  public_id: Scalars['String']['input'];
  url: Scalars['String']['input'];
};

export type EditPlayerInput = {
  dateOfBirth?: InputMaybe<Scalars['String']['input']>;
  isCaptain: Scalars['Boolean']['input'];
  isHallOfFame: Scalars['Boolean']['input'];
  isViceCaptain: Scalars['Boolean']['input'];
  name: Scalars['String']['input'];
  nationality?: InputMaybe<Scalars['String']['input']>;
  position: Scalars['String']['input'];
  seasonIds: Array<Scalars['String']['input']>;
  squadNumber: Scalars['String']['input'];
  yearJoined: Scalars['String']['input'];
};

export type EditTrophyInput = {
  comment?: InputMaybe<Scalars['String']['input']>;
  isFinal: Scalars['Boolean']['input'];
  isWinner: Scalars['Boolean']['input'];
  name: Scalars['String']['input'];
  opponent?: InputMaybe<Scalars['String']['input']>;
  seasonId: Scalars['String']['input'];
  year: Scalars['String']['input'];
};

export type EditUserInput = {
  dateOfBirth?: InputMaybe<Scalars['String']['input']>;
  email: Scalars['String']['input'];
  nationality?: InputMaybe<Scalars['String']['input']>;
  username: Scalars['String']['input'];
};

export type ForgotPasswordInput = {
  email: Scalars['String']['input'];
};

export type LeagueTableByComp = {
  __typename?: 'LeagueTableByComp';
  competition: ResultCompetiton;
  data: Array<LeagueTableTeamData>;
};

export type LeagueTableTeamData = {
  __typename?: 'LeagueTableTeamData';
  draws: Scalars['Float']['output'];
  goalDiff: Scalars['Float']['output'];
  goalsAgainst: Scalars['Float']['output'];
  goalsFor: Scalars['Float']['output'];
  losses: Scalars['Float']['output'];
  played: Scalars['Float']['output'];
  points: Scalars['Float']['output'];
  team: ResultTeam;
  wins: Scalars['Float']['output'];
};

/** The Match model */
export type Match = {
  __typename?: 'Match';
  _id: Scalars['ID']['output'];
  competitionId: Competition;
  date: Scalars['String']['output'];
  isForfeit: Scalars['Boolean']['output'];
  isHome: Scalars['Boolean']['output'];
  leaguePosition?: Maybe<Scalars['Float']['output']>;
  matchPlayers: Array<PlayerInMatch>;
  opponentGoals: Scalars['Float']['output'];
  opponentId: Team;
  seasonId: TeamSeason;
  teamGoals: Scalars['Float']['output'];
  teamId: Team;
};

export type MostInMatch = {
  __typename?: 'MostInMatch';
  date: Scalars['String']['output'];
  matchId: Scalars['String']['output'];
  opponentGoals: Scalars['Float']['output'];
  opponentName: Scalars['String']['output'];
  player: Scalars['String']['output'];
  teamGoals: Scalars['Float']['output'];
  total: Scalars['Float']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  ADD_AWARD: Award;
  ADD_COMPETITION: Competition;
  ADD_MATCH: Match;
  ADD_ORGANIZATION: Organization;
  ADD_ORG_SEASON: OrgSeason;
  ADD_PLAYER: Player;
  ADD_RESULT: Result;
  ADD_SEASON: TeamSeason;
  ADD_TEAM: Team;
  ADD_TROPHY: Trophy;
  DELETE_AWARD: Award;
  DELETE_COMPETITION: Competition;
  DELETE_MATCH: Match;
  DELETE_ORGANIZATION: Organization;
  DELETE_ORG_SEASON: OrgSeason;
  DELETE_PLAYER: Player;
  DELETE_RESULT: Result;
  DELETE_SEASON: TeamSeason;
  DELETE_TEAM: Team;
  DELETE_TROPHY: Trophy;
  DELETE_USER: User;
  EDIT_AWARD: Award;
  EDIT_COMPETITION: Competition;
  EDIT_MATCH: Match;
  EDIT_ORGANIZATION: Organization;
  EDIT_ORG_BADGE: Organization;
  EDIT_ORG_SEASON: OrgSeason;
  EDIT_PASSWORD: User;
  EDIT_PLAYER: Player;
  EDIT_PLAYER_PHOTO: Player;
  EDIT_PROFILE_IMAGE: User;
  EDIT_RESULT: Result;
  EDIT_SEASON: TeamSeason;
  EDIT_TEAM: Team;
  EDIT_TEAM_BADGE: Team;
  EDIT_TROPHY: Trophy;
  EDIT_USER: User;
  FORGOT_PASSWORD: User;
  LOG_OUT_USER: User;
  REGISTER_USER: User;
  RESET_PASSWORD: User;
  SIGN_IN_USER: User;
};


export type MutationAdd_AwardArgs = {
  data: AddAwardInput;
  seasonId: Scalars['String']['input'];
  teamId: Scalars['String']['input'];
};


export type MutationAdd_CompetitionArgs = {
  data: CompetitionInput;
  orgId: Scalars['String']['input'];
};


export type MutationAdd_MatchArgs = {
  data: TAddMatchInput;
};


export type MutationAdd_OrganizationArgs = {
  data: AddOrganizationInput;
};


export type MutationAdd_Org_SeasonArgs = {
  data: AddOrgSeasonInput;
  orgId: Scalars['String']['input'];
};


export type MutationAdd_PlayerArgs = {
  data: AddPlayerInput;
  teamId: Scalars['String']['input'];
};


export type MutationAdd_ResultArgs = {
  data: AddResultInput;
  orgId: Scalars['String']['input'];
};


export type MutationAdd_SeasonArgs = {
  data: AddTeamSeasonInput;
  teamId: Scalars['String']['input'];
};


export type MutationAdd_TeamArgs = {
  data: AddTeamInput;
  orgId: Scalars['String']['input'];
};


export type MutationAdd_TrophyArgs = {
  data: AddTrophyInput;
  teamId: Scalars['String']['input'];
};


export type MutationDelete_AwardArgs = {
  awardId: Scalars['String']['input'];
  teamId: Scalars['String']['input'];
};


export type MutationDelete_CompetitionArgs = {
  competitionId: Scalars['String']['input'];
  orgId: Scalars['String']['input'];
};


export type MutationDelete_MatchArgs = {
  matchId: Scalars['String']['input'];
  teamId: Scalars['String']['input'];
};


export type MutationDelete_OrganizationArgs = {
  orgId: Scalars['String']['input'];
};


export type MutationDelete_Org_SeasonArgs = {
  orgId: Scalars['String']['input'];
  orgSeasonId: Scalars['String']['input'];
};


export type MutationDelete_PlayerArgs = {
  playerId: Scalars['String']['input'];
  teamId: Scalars['String']['input'];
};


export type MutationDelete_ResultArgs = {
  orgId: Scalars['String']['input'];
  resultId: Scalars['String']['input'];
};


export type MutationDelete_SeasonArgs = {
  seasonId: Scalars['String']['input'];
  teamId: Scalars['String']['input'];
};


export type MutationDelete_TeamArgs = {
  teamId: Scalars['String']['input'];
};


export type MutationDelete_TrophyArgs = {
  teamId: Scalars['String']['input'];
  trophyId: Scalars['String']['input'];
};


export type MutationEdit_AwardArgs = {
  awardId: Scalars['String']['input'];
  data: AddAwardInput;
  teamId: Scalars['String']['input'];
};


export type MutationEdit_CompetitionArgs = {
  compId: Scalars['String']['input'];
  data: CompetitionInput;
  orgId: Scalars['String']['input'];
};


export type MutationEdit_MatchArgs = {
  data: TAddMatchInput;
  matchId: Scalars['String']['input'];
};


export type MutationEdit_OrganizationArgs = {
  data: UpdateOrganizationInput;
  orgId: Scalars['String']['input'];
};


export type MutationEdit_Org_BadgeArgs = {
  data: EditOrgBadgeInput;
  orgId: Scalars['String']['input'];
};


export type MutationEdit_Org_SeasonArgs = {
  data: AddOrgSeasonInput;
  orgId: Scalars['String']['input'];
  seasonId: Scalars['String']['input'];
};


export type MutationEdit_PasswordArgs = {
  data: EditPasswordInput;
};


export type MutationEdit_PlayerArgs = {
  data: EditPlayerInput;
  playerId: Scalars['String']['input'];
  teamId: Scalars['String']['input'];
};


export type MutationEdit_Player_PhotoArgs = {
  data: EditPhotoInput;
  playerId: Scalars['String']['input'];
  teamId: Scalars['String']['input'];
};


export type MutationEdit_Profile_ImageArgs = {
  data: EditImageInput;
};


export type MutationEdit_ResultArgs = {
  data: AddResultInput;
  orgId: Scalars['String']['input'];
  resultId: Scalars['String']['input'];
};


export type MutationEdit_SeasonArgs = {
  data: AddTeamSeasonInput;
  seasonId: Scalars['String']['input'];
  teamId: Scalars['String']['input'];
};


export type MutationEdit_TeamArgs = {
  data: UpdateTeamInput;
  teamId: Scalars['String']['input'];
};


export type MutationEdit_Team_BadgeArgs = {
  data: EditBadgeInput;
  teamId: Scalars['String']['input'];
};


export type MutationEdit_TrophyArgs = {
  data: EditTrophyInput;
  teamId: Scalars['String']['input'];
  trophyId: Scalars['String']['input'];
};


export type MutationEdit_UserArgs = {
  data: EditUserInput;
};


export type MutationForgot_PasswordArgs = {
  data: ForgotPasswordInput;
};


export type MutationRegister_UserArgs = {
  data: RegisterUserInput;
};


export type MutationReset_PasswordArgs = {
  data: ResetPasswordInput;
};


export type MutationSign_In_UserArgs = {
  data: SignInUserInput;
};

/** The Org Season model */
export type OrgSeason = {
  __typename?: 'OrgSeason';
  _id: Scalars['ID']['output'];
  comment?: Maybe<Scalars['String']['output']>;
  isCurrent: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  orgId: Scalars['ID']['output'];
  yearEnded: Scalars['String']['output'];
  yearStarted: Scalars['String']['output'];
};

/** The Organization model */
export type Organization = {
  __typename?: 'Organization';
  _id: Scalars['ID']['output'];
  badge: UploadedImage;
  city?: Maybe<Scalars['String']['output']>;
  competitions: Array<Competition>;
  country?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTimeISO']['output']>;
  isVerified: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['DateTimeISO']['output']>;
  website?: Maybe<Scalars['String']['output']>;
  yearFounded?: Maybe<Scalars['String']['output']>;
};

export type PastPlayer = {
  __typename?: 'PastPlayer';
  _id: Scalars['String']['output'];
  image: Scalars['String']['output'];
  joined: Scalars['String']['output'];
  left: Scalars['String']['output'];
  name: Scalars['String']['output'];
  nationality: Scalars['String']['output'];
  position: Scalars['String']['output'];
  seasons: Scalars['Float']['output'];
};

/** The Player model */
export type Player = {
  __typename?: 'Player';
  _id: Scalars['ID']['output'];
  createdAt?: Maybe<Scalars['DateTimeISO']['output']>;
  dateOfBirth?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  image: UploadedImage;
  isCaptain: Scalars['Boolean']['output'];
  isHallOfFame: Scalars['Boolean']['output'];
  isViceCaptain: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  nationality?: Maybe<Scalars['String']['output']>;
  position: Scalars['String']['output'];
  seasonIds: Array<TeamSeason>;
  squadNumber: Scalars['String']['output'];
  teamIds: Array<Team>;
  updatedAt?: Maybe<Scalars['DateTimeISO']['output']>;
  yearJoined: Scalars['String']['output'];
};

export type PlayerInMatch = {
  __typename?: 'PlayerInMatch';
  _id: Scalars['ID']['output'];
  apps: Scalars['Float']['output'];
  assists: Scalars['Float']['output'];
  cleanSheet: Scalars['Boolean']['output'];
  conceded: Scalars['Float']['output'];
  goals: Scalars['Float']['output'];
  isStarter: Scalars['Boolean']['output'];
  match: Match;
  matchPosition?: Maybe<Scalars['String']['output']>;
  mvp: Scalars['Boolean']['output'];
  ownGoals: Scalars['Float']['output'];
  pensMissed: Scalars['Float']['output'];
  pensSaved: Scalars['Float']['output'];
  pensScored: Scalars['Float']['output'];
  playerId: Player;
  redCard: Scalars['Boolean']['output'];
  yellowCards: Scalars['Float']['output'];
};

export type PlayerInfo = {
  __typename?: 'PlayerInfo';
  playerId: Scalars['String']['output'];
  playerName: Scalars['String']['output'];
};

export type PlayerMatchRecords = {
  __typename?: 'PlayerMatchRecords';
  maxAssists: Scalars['Float']['output'];
  maxCombined: Scalars['Float']['output'];
  maxGoals: Scalars['Float']['output'];
};

export type PlayerMatchesByOpponent = {
  __typename?: 'PlayerMatchesByOpponent';
  _id: Scalars['String']['output'];
  date: Scalars['String']['output'];
  isHome: Scalars['Boolean']['output'];
  opponent: Scalars['String']['output'];
  opponentGoals: Scalars['Float']['output'];
  teamGoals: Scalars['Float']['output'];
};

export type PlayerMatchesWithRecords = {
  __typename?: 'PlayerMatchesWithRecords';
  _id: Scalars['String']['output'];
  date: Scalars['String']['output'];
  opponent: Scalars['String']['output'];
  opponentGoals: Scalars['Float']['output'];
  teamGoals: Scalars['Float']['output'];
};

export type PlayerOpponentStats = {
  __typename?: 'PlayerOpponentStats';
  assists: Scalars['Float']['output'];
  conceded: Scalars['Float']['output'];
  draws: Scalars['Float']['output'];
  goals: Scalars['Float']['output'];
  goalsAgainst: Scalars['Float']['output'];
  goalsFor: Scalars['Float']['output'];
  losses: Scalars['Float']['output'];
  matches: Scalars['Float']['output'];
  opponent: Scalars['String']['output'];
  opponentBadge?: Maybe<Scalars['String']['output']>;
  opponentId: Scalars['String']['output'];
  opponentName: Scalars['String']['output'];
  wins: Scalars['Float']['output'];
};

export type PlayerStats = {
  __typename?: 'PlayerStats';
  _id?: Maybe<Scalars['String']['output']>;
  apps?: Maybe<Scalars['Float']['output']>;
  assists?: Maybe<Scalars['Float']['output']>;
  cleanSheet?: Maybe<Scalars['Float']['output']>;
  conceded?: Maybe<Scalars['Float']['output']>;
  defeats?: Maybe<Scalars['Float']['output']>;
  difference?: Maybe<Scalars['Float']['output']>;
  draws?: Maybe<Scalars['Float']['output']>;
  gamesWithAssist?: Maybe<Scalars['Float']['output']>;
  gamesWithGoal?: Maybe<Scalars['Float']['output']>;
  gamesWithGoalAndAssist?: Maybe<Scalars['Float']['output']>;
  gamesWithGoalOrAssist?: Maybe<Scalars['Float']['output']>;
  goals?: Maybe<Scalars['Float']['output']>;
  goalsAgainst?: Maybe<Scalars['Float']['output']>;
  goalsFor?: Maybe<Scalars['Float']['output']>;
  isStarter?: Maybe<Scalars['Boolean']['output']>;
  mvp?: Maybe<Scalars['Float']['output']>;
  ownGoals?: Maybe<Scalars['Float']['output']>;
  pensMissed?: Maybe<Scalars['Float']['output']>;
  pensSaved?: Maybe<Scalars['Float']['output']>;
  pensScored?: Maybe<Scalars['Float']['output']>;
  redCard?: Maybe<Scalars['Float']['output']>;
  wins?: Maybe<Scalars['Float']['output']>;
  yellowCards?: Maybe<Scalars['Float']['output']>;
};

export type PlayerStreaks = {
  __typename?: 'PlayerStreaks';
  assistStreak: Streak;
  contributionStreak: Streak;
  currentAssistStreak: Streak;
  currentContributionStreak: Streak;
  currentGoalStreak: Streak;
  currentPlayedStreak: Streak;
  goalStreak: Streak;
  playedStreak: Streak;
};

export type PositionFinishes = {
  __typename?: 'PositionFinishes';
  division?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  position?: Maybe<Scalars['Float']['output']>;
  seasonId?: Maybe<Scalars['String']['output']>;
  totalFinalPositions?: Maybe<Scalars['Float']['output']>;
};

export type Query = {
  __typename?: 'Query';
  AWARD: Award;
  AWARDS: Array<Award>;
  AWARDS_BY_PLAYER: Array<AwardByPlayer>;
  COMPETITIONS_BY_ORG: Array<Competition>;
  COMPETITION_BY_ID: Competition;
  FETCH_SEASON: TeamSeason;
  FETCH_SEASONS: Array<TeamSeason>;
  FETCH_SEASONS_POSITION: Array<PositionFinishes>;
  FETCH_TEAM: Team;
  FETCH_TROPHIES: Array<TrophyResponse>;
  FETCH_TROPHY: TrophyResponse;
  FETCH_USER: User;
  HALL_OF_FAME_PLAYERS: Array<Player>;
  LEAGUE_TABLE_DATA: Array<LeagueTableByComp>;
  MATCH: Match;
  MATCHES: Array<TMatch>;
  MATCHES_ALL_TIME_STATS: TMatchStats;
  MATCHES_BY_OPPONENT: Array<TMatch>;
  MATCHES_RECORDS: TMatchRecords;
  MATCHES_STATS: TMatchStats;
  MATCH_OPPONENTS: Array<TMatchOpponent>;
  ORGANIZATION: Organization;
  ORG_SEASON: OrgSeason;
  ORG_SEASONS: Array<OrgSeason>;
  PAST_PLAYERS: Array<PastPlayer>;
  PLAYER_BY_ID: Player;
  PLAYER_MATCHES_BY_OPPONENT: Array<PlayerMatchesByOpponent>;
  PLAYER_MATCHES_WITH_RECORD_ASSISTS: Array<PlayerMatchesWithRecords>;
  PLAYER_MATCHES_WITH_RECORD_COMBINED: Array<PlayerMatchesWithRecords>;
  PLAYER_MATCHES_WITH_RECORD_GOALS: Array<PlayerMatchesWithRecords>;
  PLAYER_MATCH_RECORDS: PlayerMatchRecords;
  PLAYER_OPPONENT_STATS: Array<PlayerOpponentStats>;
  PLAYER_SEASONS_SUMMARY: Array<TPlayerSeasonsSummary>;
  PLAYER_STATS: PlayerStats;
  PLAYER_STREAKS: PlayerStreaks;
  PLAYER_TROPHIES: Array<Trophy>;
  RESULT: Result;
  RESULTS: Array<Result>;
  SQUAD_BY_SEASON: Array<Player>;
  SQUAD_LIST_BY_SEASON: Array<SquadListBySeason>;
  SQUAD_RECORDS: SquadRecordStats;
  SQUAD_RECORD_ASSISTS_IN_MATCH: Array<MostInMatch>;
  SQUAD_RECORD_GOALS_IN_MATCH: Array<MostInMatch>;
  SQUAD_SINGLE_SEASON_RECORDS: TSquadSingleSeasonRecords;
  SQUAD_STATS: Array<TSquadStats>;
  SQUAD_STREAKS: Array<AllPlayerStreaks>;
  SQUAD_STREAK_RECORDS: SquadStreakRecords;
  TEAMS_BY_ORG: Array<Team>;
  TEAM_BY_SEARCH: Array<Team>;
  TOP_PLAYER_STREAKS: Array<TopPlayerStreaks>;
  USER_ORGANIZATIONS: Array<Organization>;
  USER_TEAMS: Array<Team>;
};


export type QueryAwardArgs = {
  awardId: Scalars['String']['input'];
};


export type QueryAwardsArgs = {
  seasonId: Scalars['String']['input'];
};


export type QueryAwards_By_PlayerArgs = {
  playerId: Scalars['String']['input'];
};


export type QueryCompetitions_By_OrgArgs = {
  orgId: Scalars['String']['input'];
};


export type QueryCompetition_By_IdArgs = {
  compId: Scalars['String']['input'];
};


export type QueryFetch_SeasonArgs = {
  seasonId: Scalars['String']['input'];
};


export type QueryFetch_SeasonsArgs = {
  teamId: Scalars['String']['input'];
};


export type QueryFetch_Seasons_PositionArgs = {
  teamId: Scalars['String']['input'];
};


export type QueryFetch_TeamArgs = {
  teamId: Scalars['String']['input'];
};


export type QueryFetch_TrophiesArgs = {
  teamId: Scalars['String']['input'];
};


export type QueryFetch_TrophyArgs = {
  trophyId: Scalars['String']['input'];
};


export type QueryHall_Of_Fame_PlayersArgs = {
  teamId: Scalars['String']['input'];
};


export type QueryLeague_Table_DataArgs = {
  orgId: Scalars['String']['input'];
  orgSeasonId: Scalars['String']['input'];
};


export type QueryMatchArgs = {
  matchId: Scalars['String']['input'];
};


export type QueryMatchesArgs = {
  seasonId: Scalars['String']['input'];
  teamId: Scalars['String']['input'];
};


export type QueryMatches_All_Time_StatsArgs = {
  teamId: Scalars['String']['input'];
};


export type QueryMatches_By_OpponentArgs = {
  opponentId: Scalars['String']['input'];
  teamId: Scalars['String']['input'];
};


export type QueryMatches_RecordsArgs = {
  teamId: Scalars['String']['input'];
};


export type QueryMatches_StatsArgs = {
  seasonId: Scalars['String']['input'];
  teamId: Scalars['String']['input'];
};


export type QueryMatch_OpponentsArgs = {
  teamId: Scalars['String']['input'];
};


export type QueryOrganizationArgs = {
  orgId: Scalars['String']['input'];
};


export type QueryOrg_SeasonArgs = {
  seasonId: Scalars['String']['input'];
};


export type QueryOrg_SeasonsArgs = {
  orgId: Scalars['String']['input'];
};


export type QueryPast_PlayersArgs = {
  teamId: Scalars['String']['input'];
};


export type QueryPlayer_By_IdArgs = {
  playerId: Scalars['String']['input'];
};


export type QueryPlayer_Matches_By_OpponentArgs = {
  opponentId: Scalars['String']['input'];
  playerId: Scalars['String']['input'];
};


export type QueryPlayer_Matches_With_Record_AssistsArgs = {
  playerId: Scalars['String']['input'];
  record: Scalars['Float']['input'];
  teamId: Scalars['String']['input'];
};


export type QueryPlayer_Matches_With_Record_CombinedArgs = {
  playerId: Scalars['String']['input'];
  record: Scalars['Float']['input'];
  teamId: Scalars['String']['input'];
};


export type QueryPlayer_Matches_With_Record_GoalsArgs = {
  playerId: Scalars['String']['input'];
  record: Scalars['Float']['input'];
  teamId: Scalars['String']['input'];
};


export type QueryPlayer_Match_RecordsArgs = {
  playerId: Scalars['String']['input'];
  teamId: Scalars['String']['input'];
};


export type QueryPlayer_Opponent_StatsArgs = {
  playerId: Scalars['String']['input'];
  showAll: Scalars['Boolean']['input'];
};


export type QueryPlayer_Seasons_SummaryArgs = {
  playerId: Scalars['String']['input'];
};


export type QueryPlayer_StatsArgs = {
  competitionId: Scalars['String']['input'];
  playerId: Scalars['String']['input'];
  seasonId: Scalars['String']['input'];
};


export type QueryPlayer_StreaksArgs = {
  playerId: Scalars['String']['input'];
  teamId: Scalars['String']['input'];
};


export type QueryPlayer_TrophiesArgs = {
  playerId: Scalars['String']['input'];
};


export type QueryResultArgs = {
  resultId: Scalars['String']['input'];
};


export type QueryResultsArgs = {
  orgId: Scalars['String']['input'];
  orgSeasonId: Scalars['String']['input'];
};


export type QuerySquad_By_SeasonArgs = {
  seasonId: Scalars['String']['input'];
  teamId: Scalars['String']['input'];
};


export type QuerySquad_List_By_SeasonArgs = {
  seasonId: Scalars['String']['input'];
  teamId: Scalars['String']['input'];
};


export type QuerySquad_RecordsArgs = {
  teamId: Scalars['String']['input'];
};


export type QuerySquad_Record_Assists_In_MatchArgs = {
  teamId: Scalars['String']['input'];
};


export type QuerySquad_Record_Goals_In_MatchArgs = {
  teamId: Scalars['String']['input'];
};


export type QuerySquad_Single_Season_RecordsArgs = {
  teamId: Scalars['String']['input'];
};


export type QuerySquad_StatsArgs = {
  competitionId: Scalars['String']['input'];
  seasonId: Scalars['String']['input'];
  teamId: Scalars['String']['input'];
};


export type QuerySquad_StreaksArgs = {
  teamId: Scalars['String']['input'];
};


export type QuerySquad_Streak_RecordsArgs = {
  teamId: Scalars['String']['input'];
};


export type QueryTeams_By_OrgArgs = {
  orgId: Scalars['String']['input'];
};


export type QueryTeam_By_SearchArgs = {
  filter: Scalars['String']['input'];
};


export type QueryTop_Player_StreaksArgs = {
  sortBy: Scalars['String']['input'];
  teamId: Scalars['String']['input'];
};

export type RegisterUserInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  username?: InputMaybe<Scalars['String']['input']>;
};

export type ResetPasswordInput = {
  password: Scalars['String']['input'];
  token: Scalars['String']['input'];
};

/** The Result model */
export type Result = {
  __typename?: 'Result';
  _id: Scalars['ID']['output'];
  awayGoals: Scalars['Float']['output'];
  awayTeam: Team;
  competitionId: Competition;
  date: Scalars['String']['output'];
  gameWeek: Scalars['Float']['output'];
  homeGoals: Scalars['Float']['output'];
  homeTeam: Team;
  orgSeasonId: OrgSeason;
};

export type ResultCompetiton = {
  __typename?: 'ResultCompetiton';
  _id: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

export type ResultTeam = {
  __typename?: 'ResultTeam';
  _id: Scalars['String']['output'];
  teamName: Scalars['String']['output'];
};

export type SignInUserInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type SingleSeasonRecord = {
  __typename?: 'SingleSeasonRecord';
  players: Array<SingleSeasonRecordPlayer>;
  seasons: Array<SingleSeasonRecordSeason>;
  value: Scalars['Float']['output'];
};

export type SingleSeasonRecordPlayer = {
  __typename?: 'SingleSeasonRecordPlayer';
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

export type SingleSeasonRecordSeason = {
  __typename?: 'SingleSeasonRecordSeason';
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

export type SquadListBySeason = {
  __typename?: 'SquadListBySeason';
  _id: Scalars['String']['output'];
  apps: Scalars['Float']['output'];
  assists: Scalars['Float']['output'];
  goals: Scalars['Float']['output'];
  image: UploadedImage;
  name: Scalars['String']['output'];
  nationality: Scalars['String']['output'];
  number: Scalars['Float']['output'];
  position: Scalars['String']['output'];
};

export type SquadRecordStats = {
  __typename?: 'SquadRecordStats';
  apps?: Maybe<Array<TopStatNames>>;
  assists?: Maybe<Array<TopStatNames>>;
  goals?: Maybe<Array<TopStatNames>>;
  mvp?: Maybe<Array<TopStatNames>>;
};

export type SquadStreakRecords = {
  __typename?: 'SquadStreakRecords';
  assists: StreakRecord;
  combined: StreakRecord;
  goals: StreakRecord;
  played: StreakRecord;
};

export type Streak = {
  __typename?: 'Streak';
  endDate?: Maybe<Scalars['String']['output']>;
  length?: Maybe<Scalars['Float']['output']>;
  startDate?: Maybe<Scalars['String']['output']>;
};

export type StreakRecord = {
  __typename?: 'StreakRecord';
  players: Array<PlayerInfo>;
  value: Scalars['Float']['output'];
};

export type TAddMatchInput = {
  competitionId: Scalars['ID']['input'];
  date: Scalars['String']['input'];
  isForfeit: Scalars['Boolean']['input'];
  isHome: Scalars['Boolean']['input'];
  leaguePosition?: InputMaybe<Scalars['Float']['input']>;
  matchPlayers: Array<TPlayerInMatchInput>;
  opponentGoals: Scalars['Float']['input'];
  opponentId: Scalars['ID']['input'];
  seasonId: Scalars['ID']['input'];
  teamGoals: Scalars['Float']['input'];
  teamId: Scalars['ID']['input'];
};

export type TMatch = {
  __typename?: 'TMatch';
  _id: Scalars['String']['output'];
  competition: Scalars['String']['output'];
  date: Scalars['String']['output'];
  isForfeit: Scalars['Boolean']['output'];
  isHome: Scalars['Boolean']['output'];
  opponentBadge?: Maybe<Scalars['String']['output']>;
  opponentGoals: Scalars['Float']['output'];
  opponentName: Scalars['String']['output'];
  teamGoals: Scalars['Float']['output'];
  teamName: Scalars['String']['output'];
};

export type TMatchOpponent = {
  __typename?: 'TMatchOpponent';
  _id: Scalars['String']['output'];
  draws: Scalars['Float']['output'];
  isActive: Scalars['Boolean']['output'];
  losses: Scalars['Float']['output'];
  opponentBadge?: Maybe<Scalars['String']['output']>;
  opponentName: Scalars['String']['output'];
  total: Scalars['Float']['output'];
  totalGoalDifference: Scalars['Float']['output'];
  totalGoalsConceded: Scalars['Float']['output'];
  totalGoalsScored: Scalars['Float']['output'];
  wins: Scalars['Float']['output'];
};

export type TMatchRecords = {
  __typename?: 'TMatchRecords';
  maxConceded?: Maybe<Array<TRecordMatch>>;
  maxDiff?: Maybe<Array<TRecordMatch>>;
  maxGoals?: Maybe<Array<TRecordMatch>>;
  minDiff?: Maybe<Array<TRecordMatch>>;
};

export type TMatchStats = {
  __typename?: 'TMatchStats';
  _id?: Maybe<Scalars['String']['output']>;
  conceded?: Maybe<Scalars['Float']['output']>;
  defeats?: Maybe<Scalars['Float']['output']>;
  difference?: Maybe<Scalars['Float']['output']>;
  draws?: Maybe<Scalars['Float']['output']>;
  oppAvg?: Maybe<Scalars['Float']['output']>;
  scored?: Maybe<Scalars['Float']['output']>;
  teamAvg?: Maybe<Scalars['Float']['output']>;
  total?: Maybe<Scalars['Float']['output']>;
  wins?: Maybe<Scalars['Float']['output']>;
};

export type TPlayerInMatchInput = {
  assists: Scalars['Float']['input'];
  cleanSheet: Scalars['Boolean']['input'];
  conceded: Scalars['Float']['input'];
  goals: Scalars['Float']['input'];
  isStarter: Scalars['Boolean']['input'];
  matchPosition?: InputMaybe<Scalars['String']['input']>;
  mvp: Scalars['Boolean']['input'];
  ownGoals: Scalars['Float']['input'];
  pensMissed: Scalars['Float']['input'];
  pensSaved: Scalars['Float']['input'];
  pensScored: Scalars['Float']['input'];
  playerId: Scalars['ID']['input'];
  redCard: Scalars['Boolean']['input'];
  yellowCards: Scalars['Float']['input'];
};

export type TPlayerSeasonsSummary = {
  __typename?: 'TPlayerSeasonsSummary';
  apps: Scalars['Float']['output'];
  assists: Scalars['Float']['output'];
  goals: Scalars['Float']['output'];
  seasonId: Scalars['String']['output'];
  seasonName: Scalars['String']['output'];
};

export type TRecordMatch = {
  __typename?: 'TRecordMatch';
  _id: Scalars['String']['output'];
  date: Scalars['String']['output'];
  isHome: Scalars['Boolean']['output'];
  opponentGoals: Scalars['Float']['output'];
  opponentId: Scalars['String']['output'];
  opponentName: Scalars['String']['output'];
  teamGoals: Scalars['Float']['output'];
};

export type TSquadSingleSeasonRecords = {
  __typename?: 'TSquadSingleSeasonRecords';
  assists?: Maybe<SingleSeasonRecord>;
  combined?: Maybe<SingleSeasonRecord>;
  goals?: Maybe<SingleSeasonRecord>;
};

export type TSquadStats = {
  __typename?: 'TSquadStats';
  _id: Scalars['String']['output'];
  apps: Scalars['Float']['output'];
  assists: Scalars['Float']['output'];
  assistsPerGame: Scalars['Float']['output'];
  cleanSheets: Scalars['Float']['output'];
  conceded: Scalars['Float']['output'];
  concededPerGame: Scalars['Float']['output'];
  dateOfBirth?: Maybe<Scalars['String']['output']>;
  goals: Scalars['Float']['output'];
  goalsPerGame: Scalars['Float']['output'];
  mvp: Scalars['Float']['output'];
  mvpPerGame: Scalars['Float']['output'];
  name: Scalars['String']['output'];
  nationality?: Maybe<Scalars['String']['output']>;
};

/** The Team model */
export type Team = {
  __typename?: 'Team';
  _id: Scalars['ID']['output'];
  awayShirt?: Maybe<Scalars['String']['output']>;
  awayShorts?: Maybe<Scalars['String']['output']>;
  awaySocks?: Maybe<Scalars['String']['output']>;
  country?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTimeISO']['output']>;
  homeShirt?: Maybe<Scalars['String']['output']>;
  homeShorts?: Maybe<Scalars['String']['output']>;
  homeSocks?: Maybe<Scalars['String']['output']>;
  isActive: Scalars['Boolean']['output'];
  isVerified: Scalars['Boolean']['output'];
  kitsBackground?: Maybe<Scalars['String']['output']>;
  location?: Maybe<Scalars['String']['output']>;
  orgId: Organization;
  seasonIds: Array<Scalars['ID']['output']>;
  stadiumCapacity?: Maybe<Scalars['String']['output']>;
  stadiumLocation?: Maybe<Scalars['String']['output']>;
  stadiumName?: Maybe<Scalars['String']['output']>;
  stadiumSurface?: Maybe<Scalars['String']['output']>;
  teamBadge?: Maybe<UploadedImage>;
  teamName: Scalars['String']['output'];
  teamRoles: Array<TeamRole>;
  updatedAt?: Maybe<Scalars['DateTimeISO']['output']>;
  yearFounded?: Maybe<Scalars['String']['output']>;
};

export type TeamRole = {
  __typename?: 'TeamRole';
  contact: Scalars['String']['output'];
  name: Scalars['String']['output'];
  role: Scalars['String']['output'];
  roleId: Scalars['String']['output'];
};

/** The Team Season model */
export type TeamSeason = {
  __typename?: 'TeamSeason';
  _id: Scalars['ID']['output'];
  awards: Array<Award>;
  comment?: Maybe<Scalars['String']['output']>;
  division?: Maybe<Scalars['String']['output']>;
  leaguePosition?: Maybe<Scalars['Float']['output']>;
  name: Scalars['String']['output'];
  teamId: Scalars['ID']['output'];
  totalFinalPositions?: Maybe<Scalars['Float']['output']>;
  yearEnded: Scalars['String']['output'];
  yearStarted: Scalars['String']['output'];
};

export type TopPlayerStreaks = {
  __typename?: 'TopPlayerStreaks';
  assists: Scalars['Float']['output'];
  combined: Scalars['Float']['output'];
  goals: Scalars['Float']['output'];
  played: Scalars['Float']['output'];
  playerId: Scalars['String']['output'];
  playerName: Scalars['String']['output'];
};

export type TopStatName = {
  __typename?: 'TopStatName';
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

export type TopStatNames = {
  __typename?: 'TopStatNames';
  _id: Scalars['Float']['output'];
  names: Array<TopStatName>;
  value: Scalars['Float']['output'];
};

/** The Trophy model */
export type Trophy = {
  __typename?: 'Trophy';
  _id: Scalars['ID']['output'];
  comment?: Maybe<Scalars['String']['output']>;
  isFinal: Scalars['Boolean']['output'];
  isWinner: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  opponent?: Maybe<Scalars['String']['output']>;
  seasonId: TeamSeason;
  teamId: Team;
  year: Scalars['String']['output'];
};

export type TrophyResponse = {
  __typename?: 'TrophyResponse';
  _id: Scalars['String']['output'];
  comment?: Maybe<Scalars['String']['output']>;
  isFinal: Scalars['Boolean']['output'];
  isWinner: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  opponent?: Maybe<Scalars['String']['output']>;
  season?: Maybe<Scalars['String']['output']>;
  year?: Maybe<Scalars['String']['output']>;
};

export type UpdateOrganizationInput = {
  city?: InputMaybe<Scalars['String']['input']>;
  country?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  website?: InputMaybe<Scalars['String']['input']>;
  yearFounded?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateTeamInput = {
  awayShirt?: InputMaybe<Scalars['String']['input']>;
  awayShorts?: InputMaybe<Scalars['String']['input']>;
  awaySocks?: InputMaybe<Scalars['String']['input']>;
  country?: InputMaybe<Scalars['String']['input']>;
  homeShirt?: InputMaybe<Scalars['String']['input']>;
  homeShorts?: InputMaybe<Scalars['String']['input']>;
  homeSocks?: InputMaybe<Scalars['String']['input']>;
  isActive: Scalars['Boolean']['input'];
  kitsBackground?: InputMaybe<Scalars['String']['input']>;
  location?: InputMaybe<Scalars['String']['input']>;
  stadiumCapacity?: InputMaybe<Scalars['String']['input']>;
  stadiumLocation?: InputMaybe<Scalars['String']['input']>;
  stadiumName?: InputMaybe<Scalars['String']['input']>;
  stadiumSurface?: InputMaybe<Scalars['String']['input']>;
  teamName: Scalars['String']['input'];
  yearFounded?: InputMaybe<Scalars['String']['input']>;
};

export type UploadedImage = {
  __typename?: 'UploadedImage';
  public_id: Scalars['String']['output'];
  url: Scalars['String']['output'];
};

/** The User model */
export type User = {
  __typename?: 'User';
  _id: Scalars['ID']['output'];
  createdAt?: Maybe<Scalars['DateTimeISO']['output']>;
  dateOfBirth?: Maybe<Scalars['String']['output']>;
  email: Scalars['String']['output'];
  image: UploadedImage;
  isVerified: Scalars['Boolean']['output'];
  nationality?: Maybe<Scalars['String']['output']>;
  orgIds: Array<Scalars['ID']['output']>;
  password: Scalars['String']['output'];
  playerId: Scalars['ID']['output'];
  roles: Array<Scalars['String']['output']>;
  teamIds: Array<Scalars['ID']['output']>;
  token?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTimeISO']['output']>;
  username: Scalars['String']['output'];
  verificationToken?: Maybe<Scalars['String']['output']>;
  yearJoined: Scalars['String']['output'];
};
