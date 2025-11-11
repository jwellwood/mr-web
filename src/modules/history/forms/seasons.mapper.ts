import { defaultDateInForm } from '../../../utils/helpers/defaultDateInForm';
import { ITeamSeason, ITeamSeasonInput } from '../types';

export const mapSeasonToFormData = (season: Partial<ITeamSeason>): ITeamSeasonInput => {
  return {
    yearStarted: defaultDateInForm(season.yearStarted).toString(),
    yearEnded: defaultDateInForm(season.yearEnded).toString(),
    leaguePosition: String(season.leaguePosition) || '0',
    totalFinalPositions: season.totalFinalPositions ? String(season.totalFinalPositions) : '10',
    division: season.division || '',
    comment: season.comment || '',
  };
};

export const mapFormDataToSeason = (season: ITeamSeasonInput): Partial<ITeamSeason> => {
  return {
    yearStarted: defaultDateInForm(season.yearStarted).toString(),
    yearEnded: defaultDateInForm(season.yearEnded).toString(),
    leaguePosition: +(season.leaguePosition ?? 0),
    totalFinalPositions: +(season.totalFinalPositions ?? 10),
    division: season.division,
    comment: season.comment,
  };
};
