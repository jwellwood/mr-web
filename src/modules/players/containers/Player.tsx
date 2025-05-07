import React from 'react';
import { useQuery } from '@apollo/client';
import { AUTH_ROLES, IMAGE_TYPE, LINK_TYPE } from 'app/constants';
import ModuleHeader from 'components/common/ModuleHeader';
import { SectionContainer } from 'components/containers';
import EditLinksModal from 'components/modals/EditLinksModal';
import CustomAppBar from 'components/navigation/CustomAppBar';
import PositionString from 'components/tables/PositionString';
import ErrorGraphql from 'errors/ErrorGraphql';
import { useAuth, useDateOfBirth } from 'hooks';
import { useCustomParams } from 'hooks/useCustomParams';
import RouteGuard from 'router/RouteGuard';
import { IListItem } from 'types';
import { PAGES } from '../constants';
import { GET_PLAYER_BY_ID } from '../graphql';
import PlayerTabs from './PlayerTabs';

const Player: React.FC = () => {
  const { teamId, playerId } = useCustomParams();
  const { isTeamAuth } = useAuth(teamId);

  const { loading, error, data } = useQuery(GET_PLAYER_BY_ID, {
    variables: { playerId: playerId },
  });

  const links: IListItem[] = [
    {
      label: 'Edit Player',
      type: LINK_TYPE.EDIT,
      link: 'edit',
    },
    {
      label: 'Edit Photo',
      type: LINK_TYPE.EDIT,
      link: 'edit_photo',
    },
    {
      label: 'Delete Player',
      type: LINK_TYPE.DELETE,
      link: 'delete',
    },
  ];

  const { age } = useDateOfBirth(data?.player.dateOfBirth);

  const dataToDisplay = [
    {
      label: '',
      value: <PositionString>{data?.player.position || '-'}</PositionString>,
    },
    { label: '', value: `#${data?.player.squadNumber || '-'}` },
    { label: '', value: `${age} years` || '-' },
  ];

  if (error) return <ErrorGraphql error={[error]} />;

  return (
    <RouteGuard authorization={AUTH_ROLES.PUBLIC}>
      <CustomAppBar
        title={PAGES.PLAYER}
        actionButton={isTeamAuth && <EditLinksModal data={links} />}
      >
        <SectionContainer>
          <ModuleHeader
            title={data?.player.name}
            badge={data?.player.image.url}
            data={dataToDisplay}
            country={data?.player.nationality}
            type={IMAGE_TYPE.USER}
            loading={loading}
          />
          <PlayerTabs />
        </SectionContainer>
      </CustomAppBar>
    </RouteGuard>
  );
};

export default Player;
