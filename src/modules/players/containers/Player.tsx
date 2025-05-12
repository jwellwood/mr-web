import React from 'react';
import { useQuery } from '@apollo/client';

import { PAGES } from '../constants';
import { GET_PLAYER_BY_ID } from '../graphql';
import PlayerTabs from './PlayerTabs';
import { useCustomParams } from '../../../hooks/useCustomParams';
import { useAuth, useDateOfBirth } from '../../../hooks';
import { IListItem } from '../../../types';
import { AuthRoles, ImageTypes, LinkTypes } from '../../../constants.ts';
import PositionString from '../../../components/tables/PositionString.tsx';
import ErrorGraphql from '../../../errors/ErrorGraphql.tsx';
import RouteGuard from '../../../router/RouteGuard.tsx';
import CustomAppBar from '../../../components/navigation/CustomAppBar.tsx';
import EditLinksModal from '../../../components/modals/EditLinksModal.tsx';
import { SectionContainer } from '../../../components/containers';
import ModuleHeader from '../../../components/common/ModuleHeader.tsx';

const Player: React.FC = () => {
  const { teamId, playerId } = useCustomParams();
  const { isTeamAuth } = useAuth(teamId);

  const { loading, error, data } = useQuery(GET_PLAYER_BY_ID, {
    variables: { playerId: playerId },
  });

  const links: IListItem[] = [
    {
      label: 'Edit Player',
      type: LinkTypes.EDIT,
      link: 'edit',
    },
    {
      label: 'Edit Photo',
      type: LinkTypes.EDIT,
      link: 'edit_photo',
    },
    {
      label: 'Delete Player',
      type: LinkTypes.DELETE,
      link: 'delete',
    },
  ];

  const { age } = useDateOfBirth(data?.player?.dateOfBirth);

  const dataToDisplay = [
    {
      label: '',
      value: <PositionString>{data?.player.position || '-'}</PositionString>,
    },
    { label: '', value: `#${data?.player.squadNumber || '-'}` },
    { label: '', value: `${age} years` },
  ];

  if (error) return <ErrorGraphql error={error} />;

  return (
    <RouteGuard authorization={AuthRoles.PUBLIC}>
      <CustomAppBar
        title={PAGES.PLAYER}
        actionButton={isTeamAuth ?? <EditLinksModal data={links} />}
      >
        <SectionContainer>
          <ModuleHeader
            title={data?.player.name || ''}
            badge={data?.player.image.url || ''}
            data={dataToDisplay}
            country={data?.player.nationality || ''}
            type={ImageTypes.USER}
            loading={loading}
          />
          <PlayerTabs />
        </SectionContainer>
      </CustomAppBar>
    </RouteGuard>
  );
};

export default Player;
