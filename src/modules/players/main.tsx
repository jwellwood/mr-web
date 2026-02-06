import { lazy } from 'react';

import { CustomTabs, ITab } from '../../components/tabs';
import { TAB_TYPES } from '../../constants';
import { PageContainer } from '../../components';
import { PAGES, PLAYER_ADMIN_LINKS } from './constants';
import { useAuth, useCustomParams } from '../../hooks';

const Player = lazy(() => import('./containers/Player'));
const PlayerTrophies = lazy(() => import('./containers/PlayerTrophies'));
const PlayerStats = lazy(() => import('./containers/PlayerStats'));
const PlayerOpponentStats = lazy(() => import('./containers/PlayerOpponentStats'));
const PlayerAwards = lazy(() => import('./containers/PlayerAwards'));
const PlayerSeasonsSummary = lazy(() => import('./containers/PlayerSeasonsSummary'));
const PlayerMatchRecords = lazy(() => import('./containers/PlayerMatchRecords'));
const PlayerGameStreaks = lazy(() => import('./containers/PlayerGameStreaks'));

export default function PlayerTabs() {
  const { teamId } = useCustomParams();
  const { isTeamAuth } = useAuth(teamId);

  const tabs: ITab[] = [
    {
      label: 'Stats',
      component: <PlayerStats />,
    },

    {
      label: 'Records',
      component: (
        <>
          <PlayerMatchRecords />
          <PlayerSeasonsSummary />
          <PlayerGameStreaks />
        </>
      ),
    },
    {
      label: 'Versus',
      component: <PlayerOpponentStats />,
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
    <PageContainer title={PAGES.PLAYER} links={isTeamAuth ? PLAYER_ADMIN_LINKS : undefined}>
      <>
        <Player />
        <CustomTabs type={TAB_TYPES.PLAYER} tabs={tabs} level="primary" />
      </>
    </PageContainer>
  );
}
