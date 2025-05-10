import { ICompetition } from '../../../types';
export const mapCompetitionInput = (input: Partial<ICompetition>) => {
  return {
    ...input,
    matchMinutes: +(input.matchMinutes || 0),
    numberOfTeams: +(input.numberOfTeams || 0),
    playersPerTeam: +(input.playersPerTeam || 0),
  };
};
