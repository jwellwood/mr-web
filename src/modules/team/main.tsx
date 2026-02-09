import { lazy } from 'react';
import { useSelector } from 'react-redux';

import { TAB_TYPES } from '../../constants';
import { CustomTabs, ITab } from '../../components/tabs';
import { useAuth, useCustomParams } from '../../hooks';
import { PAGES, TEAM_ADMIN_LINKS } from './constants';
import { getTabIndex } from '../../store';
import { PageContainer } from '../../components';
import { APP_ICONS, AppIcon, AppIconType } from '../../components/icons';

export const TeamOverview = lazy(() => import('./containers/TeamOverview'));
export const SquadTabs = lazy(() => import('../squad/main'));
export const MatchesTabs = lazy(() => import('../matches/main'));
export const HistoryTabs = lazy(() => import('../history/main'));

export default function Team() {
  const { teamId } = useCustomParams();

  const { isTeamAuth } = useAuth(teamId);
  const { team } = useSelector(getTabIndex);
  const getIcon = (name: AppIconType, index: number) => (
    <AppIcon icon={name} size="20px" color={index === team ? 'primary' : 'label'} />
  );

  const tabs: ITab[] = [
    {
      label: 'Overview',
      icon: getIcon(APP_ICONS.OVERVIEW, 0),
      component: <TeamOverview />,
    },
    {
      label: 'Players',
      icon: getIcon(APP_ICONS.SQUAD, 1),
      component: <SquadTabs />,
    },
    {
      label: 'Matches',
      icon: getIcon(APP_ICONS.MATCHES, 2),
      component: <MatchesTabs />,
    },
    {
      label: 'History',
      icon: getIcon(APP_ICONS.TROPHY, 3),
      component: <HistoryTabs />,
    },
  ];

  return (
    <PageContainer title={PAGES.TEAM} links={isTeamAuth ? TEAM_ADMIN_LINKS : undefined}>
      <CustomTabs type={TAB_TYPES.TEAM} tabs={tabs} level="primary" />
    </PageContainer>
  );
}
