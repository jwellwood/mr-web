import type { TFunction } from 'i18next';
import type { ReactNode } from 'react';
import { PresentationModal } from '../../../../../components/modals';
import { CustomTypography } from '../../../../../components/typography';
import { T_FETCH_SQUAD_SINGLE_SEASON_RECORDS_QUERY } from '../../../graphql';
import RecordPlayers from '../../squad-records/RecordPlayers';
import TopSquadSingleSeasonRecordsTable from '../../squad-records/top-squad-single-season-records/TopSquadSingleSeasonRecordsTable';

export const rows = (
  t: TFunction,
  data?: T_FETCH_SQUAD_SINGLE_SEASON_RECORDS_QUERY
): { label: string; value: ReactNode; names: ReactNode; more: ReactNode }[] => {
  const { goals, assists, combined } = data?.stats || {
    goals: [],
    assists: [],
    combined: [],
  };

  const tableData = [
    {
      type: 'goals' as const,
      label: t('RECORDS.MOST_GOALS'),
      player: goals?.[0]?.player,
      value: goals?.[0]?.value,
    },
    {
      type: 'assists' as const,
      label: t('RECORDS.MOST_ASSISTS'),
      player: assists?.[0]?.player,
      value: assists?.[0]?.value,
    },
    {
      type: 'combined' as const,
      label: t('RECORDS.COMBINED'),
      player: combined?.[0]?.player,
      value: combined?.[0]?.value,
    },
  ];

  return tableData.map(item => {
    return {
      label: item.label,
      value: item.value,
      names: <RecordPlayers names={item.player ? [item.player] : []} />,
      more: (
        <PresentationModal
          title={item.label}
          buttonElement={
            <CustomTypography bold size="xs" color="primary">
              Top 10
            </CustomTypography>
          }
        >
          <TopSquadSingleSeasonRecordsTable stats={data?.stats?.[item.type]} />
        </PresentationModal>
      ),
    };
  });
};
