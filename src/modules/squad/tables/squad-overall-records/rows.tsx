import type { ReactNode } from 'react';
import { PresentationModal } from '../../../../components/modals';
import { CustomTypography } from '../../../../components/typography';
import RecordPlayers from '../../components/squad-records/RecordPlayers';
import TopSquadRecordsTable from '../../components/squad-records/top-squad-records/TopSquadRecordsTable';
import { FETCH_SQUAD_RECORDS_QUERY } from '../../types';

export const rows = (
  data?: FETCH_SQUAD_RECORDS_QUERY
): { label: string; value: ReactNode; names: ReactNode; more: ReactNode }[] => {
  const { apps, goals, assists, mvp } = data?.stats || {
    apps: [{ value: 0, names: [] }],
    goals: [{ value: 0, names: [] }],
    assists: [{ value: 0, names: [] }],
    mvp: [{ value: 0, names: [] }],
  };

  const tableData = [
    {
      type: 'apps',
      label: 'Most Apps',
      names: apps ? apps[0]?.names : [],
      value: apps ? apps[0]?.value : 0,
    },
    {
      type: 'goals',
      label: 'Most Goals',
      names: goals ? goals[0]?.names : [],
      value: goals ? goals[0]?.value : 0,
    },
    {
      type: 'assists',
      label: 'Most Assists',
      names: assists ? assists[0]?.names : [],
      value: assists ? assists[0]?.value : 0,
    },
    {
      type: 'mvp',
      label: 'Most MVPs',
      names: mvp ? mvp[0]?.names : [],
      value: mvp ? mvp[0]?.value : 0,
    },
  ] as const;

  return tableData.map(item => {
    return {
      label: item.label,
      value: item.value,
      names: <RecordPlayers names={item?.names || []} />,
      more: (
        <PresentationModal
          title={item.label}
          buttonElement={
            <CustomTypography bold size="xs" color="primary">
              Top 5
            </CustomTypography>
          }
        >
          <TopSquadRecordsTable stats={data?.stats?.[item.type]} />
        </PresentationModal>
      ),
    };
  });
};
