import { HISTORY_ICONS } from '../../../components/icons/icons';
import AppIcon from '../../../components/icons/AppIcon';
import { CustomTypography } from '../../../components/typography';
import { ITrophyResponse } from '../../history/types';

export const getTrophyListItem = (trophy: ITrophyResponse) => {
  return {
    icon: (
      <AppIcon
        size="1.4rem"
        color={trophy.isWinner ? 'gold' : 'silver'}
        icon={trophy.isWinner ? HISTORY_ICONS.WINNER : HISTORY_ICONS.RUNNER_UP}
      />
    ),
    link: `trophy/${trophy._id}`,
    label: (
      <CustomTypography size="xs" bold color="data">
        {trophy.name}
      </CustomTypography>
    ),
    value: (
      <CustomTypography size="xs" bold color="data">
        {trophy.year}
      </CustomTypography>
    ),
  };
};
