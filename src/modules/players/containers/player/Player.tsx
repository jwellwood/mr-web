import { useQuery } from '@apollo/client';

import { FETCH_PLAYER } from '../../graphql';
import { PAGES, PLAYER_ADMIN_LINKS } from '../../constants';
import PlayerTabs from './PlayerTabs.tsx';
import { useCustomParams } from '../../../../hooks/useCustomParams.tsx';
import { useAuth, useDateOfBirth } from '../../../../hooks';
import { AUTH_ROLES, IMAGE_TYPE } from '../../../../constants';
import ErrorGraphql from '../../../../errors/ErrorGraphql.tsx';
import RouteGuard from '../../../../router/RouteGuard.tsx';
import ModuleHeader from '../../../../components/shared/module-header/ModuleHeader.tsx';
import { PageHeader, PositionCell } from '../../../../components';

export default function Player() {
  const { teamId, playerId } = useCustomParams();
  const { isTeamAuth } = useAuth(teamId);

  const { loading, error, data } = useQuery(FETCH_PLAYER, {
    variables: { playerId: playerId },
  });

  const { age } = useDateOfBirth(data?.player?.dateOfBirth);

  const dataToDisplay = [
    {
      label: '',
      value: <PositionCell>{data?.player.position || '-'}</PositionCell>,
    },
    { label: '', value: `#${data?.player.squadNumber || '-'}` },
    { label: '', value: `${age} years` },
  ];

  const renderContent = () => {
    return (
      <ModuleHeader
        title={data?.player.name || ''}
        badge={data?.player.image.url || ''}
        data={dataToDisplay}
        country={data?.player.nationality || ''}
        type={IMAGE_TYPE.USER}
        loading={loading}
      />
    );
  };

  return (
    <RouteGuard authorization={AUTH_ROLES.PUBLIC}>
      <PageHeader title={PAGES.PLAYER} links={isTeamAuth ? PLAYER_ADMIN_LINKS : undefined}>
        <>
          {error ? <ErrorGraphql error={error} /> : renderContent()}
          <PlayerTabs />
        </>
      </PageHeader>
    </RouteGuard>
  );
}
