import { ImageTypes } from '../../../constants.ts';
import CustomAvatar from '../../../components/avatars/CustomAvatar.tsx';
import PresentationModal from '../../../components/modals/PresentationModal.tsx';
import CustomTypography from '../../../components/typography/CustomTypography.tsx';
import { getAvg } from '../../../utils/helpers';
import { IPlayerVsStats } from '../../matches/types.ts';

export const mapPlayerVsStats = (stats: IPlayerVsStats[]) => {
  return stats?.map((item: IPlayerVsStats) => ({
    name: {
      value: (
        <div
          style={{
            display: 'flex',
            alignContent: 'center',
            alignItems: 'center',
          }}
        >
          <CustomAvatar
            size="24px"
            imageUrl={item?.opponentBadge || 'default'}
            type={ImageTypes.TEAM}
          />
          <div style={{ marginRight: '4px' }} />
          <PresentationModal
            title="Matches"
            fullScreen
            buttonElement={
              <CustomTypography size="xs" color="data" bold>
                {item?.opponent}
              </CustomTypography>
            }
          >
            Coming soon
          </PresentationModal>
        </div>
      ),
    },
    matches: item?.matches,
    goals: item?.goals,
    goalsAvg: getAvg(item?.goals, item?.matches, 1),
    assists: item?.assists,
    assistsAvg: getAvg(item?.assists, item?.matches, 1),
    conceded: item?.conceded,
    concededAvg: getAvg(item?.conceded, item?.matches, 1),
  }));
};
