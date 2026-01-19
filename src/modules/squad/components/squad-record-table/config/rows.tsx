import { CustomButton, CustomTypography } from '../../../../../components';
import CustomSkeleton from '../../../../../components/loaders/CustomSkeleton';
import StatSkeleton from '../../../../../components/loaders/StatSkeleton';
import { PresentationModal } from '../../../../../components/modals';
import { ISquadRecords } from '../../../types';
import RecordPlayers from '../../RecordPlayers';
import TopSquadRecordsTable from '../../top-squad-records/TopSquadRecordsTable';

export const rows = (data?: { stats: ISquadRecords }, loading?: boolean) => {
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
      names: apps[0]?.names,
      value: apps[0]?.value,
    },
    { type: 'goals', label: 'Most Goals', names: goals[0]?.names, value: goals[0]?.value },
    {
      type: 'assists',
      label: 'Most Assists',
      names: assists[0]?.names,
      value: assists[0]?.value,
    },
    { type: 'mvp', label: 'Most MVPs', names: mvp[0]?.names, value: mvp[0]?.value },
  ];

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
          <TopSquadRecordsTable
            data={data?.stats[item.type as keyof ISquadRecords]}
            loading={loading}
          />
        </PresentationModal>
      ),
    };
  });
};
