import { lazy } from 'react';

import { CustomTabs, ITab } from '../../components/tabs';
import { AUTH_ROLES, TAB_TYPES } from '../../constants';
import { PageContainer } from '../../components';
import Player from './containers/Player';
import { PAGES, PLAYER_ADMIN_LINKS } from './constants';
import { useAuth, useCustomParams } from '../../hooks';

const PlayerAllTimeStats = lazy(() => import('./containers/PlayerAllTimeStats'));
const PlayerTrophies = lazy(() => import('./containers/PlayerTrophies'));
const PlayerSeasonStats = lazy(() => import('./containers/PlayerSeasonStats'));
const PlayerOpponentStats = lazy(() => import('./containers/PlayerOpponentStats'));
const PlayerAwards = lazy(() => import('./containers/PlayerAwards'));
const PlayerMatchesWithRecords = lazy(() => import('./containers/PlayerMatchesWithRecords'));

export default function PlayerTabs() {
  const { teamId } = useCustomParams();
  const { isTeamAuth } = useAuth(teamId);

  const tabs: ITab[] = [
    { label: 'Season', component: <PlayerSeasonStats /> },
    { label: 'All Time', component: <PlayerAllTimeStats /> },
    {
      label: 'Versus',
      component: (
        <>
          <PlayerMatchesWithRecords />
          <PlayerOpponentStats />
        </>
      ),
    },
    {
      label: 'Honors',
      component: (
        <>
          <PlayerTrophies />
          <PlayerAwards />
        </>
      ),
    },
  ];

  return (
    <PageContainer
      auth={AUTH_ROLES.PUBLIC}
      title={PAGES.PLAYER}
      links={isTeamAuth ? PLAYER_ADMIN_LINKS : undefined}
    >
      <>
        <Player />
        <CustomTabs type={TAB_TYPES.PLAYER} tabs={tabs} level="primary" />
      </>
    </PageContainer>
  );
}
