import type { ISelectOptions } from '../../../components';
import type { T_EDIT_TROPHY_VARIABLES, T_FETCH_TROPHY } from '../graphql';
import { TrophyFormData } from '../schema';

export function mapTrophyToForm(
  trophy: T_FETCH_TROPHY['trophy'] | null | undefined,
  seasonOptions?: ISelectOptions[]
): TrophyFormData {
  if (!trophy) {
    return {
      name: '',
      seasonId: '',
      year: new Date(),
      isWinner: false,
      isFinal: false,
      opponent: undefined,
      comment: undefined,
    };
  }

  const seasonId =
    (seasonOptions?.find(season => season.label === trophy.season)?.value as string) || '';

  const year = trophy.year ? new Date(trophy.year) : new Date();

  return {
    name: trophy.name,
    seasonId,
    year,
    isWinner: trophy.isWinner,
    isFinal: trophy.isFinal,
    opponent: trophy.opponent ?? undefined,
    comment: trophy.comment ?? undefined,
  };
}

export function mapFormToEditTrophyVariables(
  form: Partial<TrophyFormData>
): Omit<T_EDIT_TROPHY_VARIABLES, 'teamId' | 'trophyId'> {
  const yearRaw = form.year as unknown;
  let year: string = '';
  if (yearRaw instanceof Date && !isNaN(yearRaw.getTime())) {
    year = String(yearRaw.getFullYear());
  } else if (typeof yearRaw === 'string') {
    year = yearRaw;
  }

  return {
    name: (form.name ?? '').trim(),
    seasonId: form.seasonId ?? '',
    year,
    isWinner: !!form.isWinner,
    isFinal: !!form.isFinal,
    opponent: form.opponent ?? undefined,
    comment: form.comment ?? undefined,
  };
}

export const mapTrophyForm = {
  toForm: mapTrophyToForm,
  toVariables: mapFormToEditTrophyVariables,
};
