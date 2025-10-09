import { ICompetitionInput } from '../types';

export const mapCompetitionInput = (input: ICompetitionInput) => {
  return {
    ...input,
    matchMinutes: +(input.matchMinutes || 0),
    numberOfTeams: +(input.numberOfTeams || 0),
    playersPerTeam: +(input.playersPerTeam || 0),
  };
};
