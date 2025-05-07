import { ICompetition } from 'types';

export const mapCompetitionInput = (input: Partial<ICompetition>) => {
  return {
    ...input,
    matchMinutes: +input.matchMinutes,
    numberOfTeams: +input.numberOfTeams,
    playersPerTeam: +input.playersPerTeam,
  };
};
