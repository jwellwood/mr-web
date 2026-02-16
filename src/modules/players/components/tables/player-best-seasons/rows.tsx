import { CustomButton } from '../../../../../components/buttons';
import { PresentationModal } from '../../../../../components/modals';
import { CustomTable } from '../../../../../components/tables';
import { CustomTypography } from '../../../../../components/typography';
import { T_FETCH_PLAYER_SEASONS_SUMMARY } from '../../../types';
import { columns } from './columns';

export const rows = (data?: T_FETCH_PLAYER_SEASONS_SUMMARY['seasons'], loading?: boolean) => {
  const maxGoals = Math.max(...(data?.map(season => season.goals) || [0]));
  const maxAssists = Math.max(...(data?.map(season => season.assists) || [0]));
  const maxCombined = Math.max(...(data?.map(season => season.goals + season.assists) || [0]));

  const seasonModal = () => {
    const btn = (
      <CustomButton variant="text">
        <CustomTypography bold color="primary" size="xs">
          Seasons
        </CustomTypography>
      </CustomButton>
    );
    return (
      <PresentationModal buttonElement={btn} title="Seasons">
        <CustomTable
          columns={columns}
          rows={rows(data, loading)}
          loading={loading}
          isSortable
          loadingRowCount={10}
        />
      </PresentationModal>
    );
  };

  const rowData = [
    {
      label: 'Goals',
      value: maxGoals,
      seasons: seasonModal(),
    },
    {
      label: 'Assists',
      value: maxAssists,
      seasons: seasonModal(),
    },
    {
      label: 'Combined',
      value: maxCombined,
      seasons: seasonModal(),
    },
  ];

  return rowData.map(item => {
    return {
      label: item.label,
      value: item.value,
      more: item.seasons ? item.seasons : '',
    };
  });
};
