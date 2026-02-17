export type ICompetition = {
  _id?: string;
  orgId: string;
  name: string;
  matchMinutes: number;
  playersPerTeam: number;
  competitionType: string;
  isActive: boolean;
  winners: ICompetitionWinner[];
};

export type ICompetitionWinner = {
  year: string;
  teamId: string;
  isWinner: boolean;
  isRunnerUp: boolean;
};
