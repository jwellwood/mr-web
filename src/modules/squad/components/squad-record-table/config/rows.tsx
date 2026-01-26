import { CustomButton, CustomTypography } from '../../../../../components';
import type { ReactNode } from 'react';
import CustomSkeleton from '../../../../../components/loaders/CustomSkeleton';
import StatSkeleton from '../../../../../components/loaders/StatSkeleton';
import { PresentationModal } from '../../../../../components/modals';
import RecordPlayers from '../../RecordPlayers';
import TopSquadRecordsTable from '../../top-squad-records/TopSquadRecordsTable';
import { FETCH_SQUAD_RECORDS_QUERY } from '../../../types';

export const rows = (
  data?: FETCH_SQUAD_RECORDS_QUERY,
  loading = false
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
      value: loading ? <StatSkeleton /> : item.value,
      names: loading ? (
        <CustomSkeleton width="100px" />
      ) : (
        <RecordPlayers names={item?.names || []} loading={loading} />
      ),
      more: loading ? (
        <StatSkeleton />
      ) : (
        <PresentationModal
          title={item.label}
          buttonElement={
            <CustomButton variant="text">
              <CustomTypography bold size="xs" color="primary">
                Top 5
              </CustomTypography>
            </CustomButton>
          }
        >
          <TopSquadRecordsTable stats={data?.stats?.[item.type]} loading={loading} />
        </PresentationModal>
      ),
    };
  });
};
