import { lazy } from 'react';
import { useSelector } from 'react-redux';

import { AUTH_ROLES, TAB_TYPES } from '../../constants';
import NavIcon from '../../components/icons/NavIcon';
import { CustomTabs, ITab } from '../../components/tabs';
import { useAuth, useCustomParams } from '../../hooks';
import { PAGES, TEAM_ADMIN_LINKS } from './constants';
import { IIconType } from '../../components/icons/types';
import { getTabIndex } from '../../store/features/tabs/tabsSelector';
import { NAV_ICONS } from '../../components/icons/icons';
import { PageContainer } from '../../components';

export const TeamOverview = lazy(() => import('./containers/TeamOverview'));
export const SquadTabs = lazy(() => import('../squad/main'));
export const MatchesTabs = lazy(() => import('../matches/main'));
export const HistoryTabs = lazy(() => import('../history/main'));

export default function Team() {
  const { teamId } = useCustomParams();

  const { isTeamAuth } = useAuth(teamId);
  const { team } = useSelector(getTabIndex);
  const getIcon = (name: IIconType, index: number) => (
    <NavIcon icon={name} size="20px" color={index === team ? 'primary' : 'label'} />
  );

  const tabs: ITab[] = [
    {
      label: 'Overview',
      icon: getIcon(NAV_ICONS.OVERVIEW, 0),
      component: <TeamOverview />,
    },
    {
      label: 'Players',
      icon: getIcon(NAV_ICONS.SQUAD, 1),
      component: <SquadTabs />,
    },
    {
      label: 'Matches',
      icon: getIcon(NAV_ICONS.MATCHES, 2),
      component: <MatchesTabs />,
    },
    {
      label: 'History',
      icon: getIcon(NAV_ICONS.HISTORY, 3),
      component: <HistoryTabs />,
    },
  ];

  return (
    <PageContainer
      auth={AUTH_ROLES.PUBLIC}
      title={PAGES.TEAM}
      links={isTeamAuth ? TEAM_ADMIN_LINKS : undefined}
    >
      <CustomTabs type={TAB_TYPES.TEAM} tabs={tabs} level="primary" />
    </PageContainer>
  );
}
