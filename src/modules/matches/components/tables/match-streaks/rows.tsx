import { TFunction } from 'i18next';
import { getShortDate } from '../../../../../utils';
import { T_FETCH_MATCHES_STREAK } from '../../../graphql';

export const rows = (t: TFunction, streaks?: T_FETCH_MATCHES_STREAK['streaks']) => {
  const getRowData = (streakType: keyof T_FETCH_MATCHES_STREAK['streaks']) => {
    const longest = streaks ? streaks[streakType]?.length || 0 : 0;
    const start = streaks ? getShortDate(streaks[streakType]?.startDate) : '';
    const end = streaks ? getShortDate(streaks[streakType]?.endDate) : '';
    return {
      longest,
      start,
      end,
    };
  };

  return [
    {
      label: t('TABLES.RECORDS.STREAKS.WINS'),
      ...getRowData('longestWinStreak'),
    },
    {
      label: t('TABLES.RECORDS.STREAKS.UNBEATEN'),
      ...getRowData('longestUnbeatenStreak'),
    },
    {
      label: t('TABLES.RECORDS.STREAKS.LOSS'),
      ...getRowData('longestLossStreak'),
    },
    {
      label: t('TABLES.RECORDS.STREAKS.WINLESS'),
      ...getRowData('longestWinlessStreak'),
    },
  ];
};
