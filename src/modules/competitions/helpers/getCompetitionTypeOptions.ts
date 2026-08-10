import { TFunction } from 'i18next';

export const getCompetitionTypeOptions = (t: TFunction<'competitions'>) => [
  { label: t('OPTIONS.LEAGUE'), value: 'League' },
  { label: t('OPTIONS.CUP'), value: 'Cup' },
];
