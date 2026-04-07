import { TFunction } from 'i18next';

export const getCompetitionTypeOptions = (t: TFunction<'competitions'>) => [
  { label: t('OPTIONS.FRIENDLY'), value: 'Friendly' },
  { label: t('OPTIONS.LEAGUE'), value: 'League' },
  { label: t('OPTIONS.CUP'), value: 'Cup' },
  { label: t('OPTIONS.TOURNAMENT'), value: 'Tournament' },
  { label: t('OPTIONS.OTHER'), value: 'Other' },
];
