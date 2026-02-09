import { APP_ICONS, AppIcon } from '../../../../components/icons';
import { CustomTypography } from '../../../../components/typography';
import { T_FETCH_PLAYER_TROPHIES } from '../../types';

export const getTrophyListItem = (trophy: T_FETCH_PLAYER_TROPHIES['trophies'][number]) => {
  return {
    icon: (
      <AppIcon
        size="1.4rem"
        color={trophy.isWinner ? 'gold' : 'silver'}
        icon={trophy.isWinner ? APP_ICONS.TROPHY : APP_ICONS.MEDAL}
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
