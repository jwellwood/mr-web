import { CustomButton, CustomTypography } from '../../../../../../../components';
import CustomSkeleton from '../../../../../../../components/loaders/CustomSkeleton';
import StatSkeleton from '../../../../../../../components/loaders/StatSkeleton';
import { PresentationModal } from '../../../../../../../components/modals';
import CustomTable from '../../../../../../../components/tables/CustomTable';
import * as ALL_SEASONS_CONFIG from '../all-seasons';
import { T_FETCH_PLAYER_SEASONS_SUMMARY } from '../../../../../types';

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
          cellIndexStyles={ALL_SEASONS_CONFIG.styles}
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
      value: loading ? <StatSkeleton /> : item.value,
      more: loading ? <CustomSkeleton width="50px" /> : { value: item.seasons ? item.seasons : '' },
    };
  });
};
