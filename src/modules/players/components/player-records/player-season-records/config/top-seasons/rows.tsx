import { CustomButton, CustomTypography } from '../../../../../../../components';
import { PresentationModal } from '../../../../../../../components/modals';
import CustomTable from '../../../../../../../components/tables/custom-table/CustomTable';
import { T_FETCH_PLAYER_SEASONS_SUMMARY } from '../../../../../types';
import * as ALL_SEASONS_CONFIG from '../all-seasons';

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
          columns={ALL_SEASONS_CONFIG.columns}
          rows={ALL_SEASONS_CONFIG.rows(data, loading)}
          loading={loading}
          isSortable
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
