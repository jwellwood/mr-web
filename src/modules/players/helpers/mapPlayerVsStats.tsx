import React from 'react';
import { IMAGE_TYPE } from 'app/constants';
import CustomAvatar from 'components/avatars/CustomAvatar';
import { PresentationModal } from 'components/modals';
import { CustomTypography } from 'components/typography';
import { IPlayerVsStats } from 'types';
import { getAvg } from 'utils/helpers';

export const mapPlayerVsStats = (stats: IPlayerVsStats[], loading: boolean) => {
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
            imageUrl={item?.opponentBadge}
            type={IMAGE_TYPE.TEAM}
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
