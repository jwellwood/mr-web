import type { AwardFormData } from '../forms/schema';
import { T_EDIT_AWARD_VARIABLES, T_FETCH_AWARD } from '../graphql';

export function mapAwardToForm(award: T_FETCH_AWARD['award'] | null | undefined): AwardFormData {
  if (!award) {
    return {
      awardName: '',
      winners: [],
      awardValue: undefined,
      comment: undefined,
    };
  }

  return {
    awardName: award.awardName,
    winners: award.winners?.map(player => player._id) ?? [],
    awardValue: award.awardValue ?? undefined,
    comment: award.comment ?? undefined,
  };
}

export function mapFormToEditAwardVariables(
  form: Partial<AwardFormData>
): Omit<T_EDIT_AWARD_VARIABLES, 'awardId' | 'teamId'> {
  const winners = (form.winners ?? []).filter(Boolean) as string[];

  const awardValueRaw = (form.awardValue ?? undefined) as unknown;
  let awardValue: number | undefined = undefined;
  if (awardValueRaw !== undefined && awardValueRaw !== '') {
    const n = typeof awardValueRaw === 'string' ? Number(awardValueRaw) : (awardValueRaw as number);
    if (!Number.isNaN(n)) awardValue = n;
  }

  return {
    awardName: (form.awardName ?? '').trim(),
    winners,
    awardValue,
    comment: form.comment ?? undefined,
  };
}

export const mapAwardForm = {
  toForm: mapAwardToForm,
  toVariables: mapFormToEditAwardVariables,
};
