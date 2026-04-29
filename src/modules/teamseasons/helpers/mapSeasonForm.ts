import type { SeasonFormData } from '../forms/schema';
import { T_FETCH_SEASON } from '../graphql';
import type { Edit_SeasonMutationVariables } from '../graphql/EDIT_SEASON.generated';

export function mapSeasonToForm(
  season: T_FETCH_SEASON['season'] | null | undefined
): SeasonFormData {
  if (!season) {
    return {
      yearStarted: new Date(),
      yearEnded: new Date(),
      leaguePosition: undefined,
      totalFinalPositions: 10,
      division: undefined,
      comment: undefined,
      orgSeasonId: undefined,
    };
  }

  return {
    yearStarted: season.yearStarted ? new Date(season.yearStarted) : new Date(),
    yearEnded: season.yearEnded ? new Date(season.yearEnded) : new Date(),
    leaguePosition: season.leaguePosition ?? undefined,
    totalFinalPositions: season.totalFinalPositions ?? 10,
    division: season.division ?? undefined,
    comment: season.comment ?? undefined,
    orgSeasonId: season.orgSeasonId ?? undefined,
  };
}

export function mapFormToEditSeasonVariables(
  form: Partial<SeasonFormData>
): Omit<Edit_SeasonMutationVariables, 'teamId' | 'seasonId'> {
  const yearStartedRaw = form.yearStarted as unknown;
  const yearEndedRaw = form.yearEnded as unknown;

  const yearStarted =
    yearStartedRaw instanceof Date && !isNaN(yearStartedRaw.getTime())
      ? yearStartedRaw.toISOString()
      : (yearStartedRaw as string) || '';

  const yearEnded =
    yearEndedRaw instanceof Date && !isNaN(yearEndedRaw.getTime())
      ? yearEndedRaw.toISOString()
      : (yearEndedRaw as string) || '';

  const leaguePosition =
    form.leaguePosition !== undefined && form.leaguePosition !== null
      ? Number(form.leaguePosition)
      : undefined;

  const totalFinalPositions =
    form.totalFinalPositions !== undefined && form.totalFinalPositions !== null
      ? Number(form.totalFinalPositions)
      : undefined;

  return {
    yearStarted,
    yearEnded,
    leaguePosition,
    totalFinalPositions,
    division: form.division ?? undefined,
    comment: form.comment ?? undefined,
    orgSeasonId: form.orgSeasonId || undefined,
  };
}

export const mapSeasonForm = {
  toForm: mapSeasonToForm,
  toVariables: mapFormToEditSeasonVariables,
};
