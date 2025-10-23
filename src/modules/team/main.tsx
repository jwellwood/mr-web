import React from 'react';
import { useSelector } from 'react-redux';
import { AUTH_ROLES, TAB_TYPES } from '../../app/constants';
import NavIcon from '../../components/icons/NavIcon';
import EditLinksModal from '../../components/modals/EditLinksModal';
import CustomAppBar from '../../components/navigation/CustomAppBar';
import { CustomTabs, ITab } from '../../components/tabs';
import { useAuth } from '../../hooks';
import { useCustomParams } from '../../hooks/useCustomParams';
import History from '../../modules/history/containers/History';
import MatchesTabs from '../../modules/matches/containers/MatchesTabs';

import RouteGuard from '../../router/RouteGuard';
import { PAGES, TEAM_ADMIN_LINKS } from './constants';
import TeamOverview from './containers/TeamOverview';
import { IIconType } from '../../components/icons/types';
import { getTabIndex } from '../../store/features/tabs/tabsSelector';
import { NAV_ICONS } from '../../app/icons';
import SquadTabs from '../squad/main';

const Team: React.FC = () => {
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
      component: <History />,
    },
  ];

  return (
    <RouteGuard authorization={AUTH_ROLES.PUBLIC}>
      <CustomAppBar
        title={PAGES.TEAM}
        actionButton={isTeamAuth ? <EditLinksModal data={TEAM_ADMIN_LINKS} /> : null}
      >
        <CustomTabs type={TAB_TYPES.TEAM} tabs={tabs} level="primary" />
      </CustomAppBar>
    </RouteGuard>
  );
};

export default Team;
