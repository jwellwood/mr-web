import { lazy } from 'react';
import { useTranslation } from 'react-i18next';
import { PageContainer } from '../../../components';
import { CustomTabs, ITab } from '../../../components/tabs';
import { TAB_TYPES } from '../../../constants';
import { useAuth, useCustomParams } from '../../../hooks';
import { getPlayerAdminLinks } from '../helpers/getPlayerAdminLinks';

const Player = lazy(() => import('../containers/Player'));
const PlayerTrophies = lazy(() => import('../containers/PlayerTrophies'));
const PlayerStats = lazy(() => import('../containers/PlayerStats'));
const PlayerOpponentStats = lazy(() => import('../containers/PlayerOpponentStats'));
const PlayerAwards = lazy(() => import('../containers/PlayerAwards'));
const PlayerSeasonsSummary = lazy(() => import('../containers/PlayerSeasonsSummary'));
const PlayerMatchRecords = lazy(() => import('../containers/PlayerMatchRecords'));
const PlayerGameStreaks = lazy(() => import('../containers/PlayerGameStreaks'));

export default function PlayerTabs() {
  const { t } = useTranslation('players');
  const { teamId } = useCustomParams();
  const { isTeamAuth } = useAuth(teamId);

  const tabs: ITab[] = [
    {
      label: t('TABS.STATS'),
      component: <PlayerStats />,
    },

    {
      label: t('TABS.RECORDS'),
      component: (
        <>
          <PlayerMatchRecords />
          <PlayerSeasonsSummary />
          <PlayerGameStreaks />
        </>
      ),
    },
    {
      label: t('TABS.OPPONENTS'),
      component: <PlayerOpponentStats />,
    },
    {
      label: t('TABS.HONORS'),
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
      title={t('PAGES.PLAYER')}
      links={isTeamAuth ? getPlayerAdminLinks(t) : undefined}
    >
      <>
        <Player />
        <CustomTabs type={TAB_TYPES.PLAYER} tabs={tabs} level="primary" />
      </>
    </PageContainer>
  );
}
