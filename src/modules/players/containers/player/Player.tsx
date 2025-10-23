import { useQuery } from '@apollo/client';

import { FETCH_PLAYER } from '../../graphql';
import { PAGES, PLAYER_ADMIN_LINKS } from '../../constants.ts';
import PlayerTabs from './PlayerTabs.tsx';
import { useCustomParams } from '../../../../hooks/useCustomParams.tsx';
import { useAuth, useDateOfBirth } from '../../../../hooks';
import { AuthRoles, ImageTypes } from '../../../../constants.ts';
import PositionString from '../../../../components/tables/PositionString.tsx';
import ErrorGraphql from '../../../../errors/ErrorGraphql.tsx';
import RouteGuard from '../../../../router/RouteGuard.tsx';
import CustomAppBar from '../../../../components/navigation/CustomAppBar.tsx';
import EditLinksModal from '../../../../components/modals/EditLinksModal.tsx';
import { SectionContainer } from '../../../../components/containers';
import ModuleHeader from '../../../../components/common/ModuleHeader.tsx';

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
      value: <PositionString>{data?.player.position || '-'}</PositionString>,
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
        type={ImageTypes.USER}
        loading={loading}
      />
    );
  };

  return (
    <RouteGuard authorization={AuthRoles.PUBLIC}>
      <CustomAppBar
        title={PAGES.PLAYER}
        actionButton={isTeamAuth ? <EditLinksModal data={PLAYER_ADMIN_LINKS} /> : null}
      >
        <SectionContainer>
          {error ? <ErrorGraphql error={error} /> : renderContent()}
          <PlayerTabs />
        </SectionContainer>
      </CustomAppBar>
    </RouteGuard>
  );
}
