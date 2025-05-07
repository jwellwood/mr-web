import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { AUTH_ROLES, LINK_TYPE, TAB_TYPES } from 'app/constants';
import { NAV_ICONS } from 'app/icons';
import NavIcon from 'components/icons/NavIcon';
import EditLinksModal from 'components/modals/EditLinksModal';
import CustomAppBar from 'components/navigation/CustomAppBar';
import { CustomTabs, ITab } from 'components/tabs';
import { useAuth } from 'hooks';
import { useCustomParams } from 'hooks/useCustomParams';
import History from 'modules/history/containers/History';
import MatchesTabs from 'modules/matches/containers/MatchesTabs';
import SquadTabs from 'modules/players/containers/SquadTabs';
import RouteGuard from 'router/RouteGuard';
import { getTabIndex } from 'selectors';
import { PAGES } from '../constants';
import TeamOverview from './TeamOverview';

const Team: React.FC = () => {
  const { teamId } = useCustomParams();
  const { search } = useLocation();
  const { isTeamAuth } = useAuth(teamId);
  const { team } = useSelector(getTabIndex);

  const getIcon = (name, index) => (
    <NavIcon
      icon={name}
      size="20px"
      color={index === team ? 'primary' : 'label'}
    />
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

  const links = [
    {
      label: 'Add Match',
      type: LINK_TYPE.ADD,
      link: `add_match${search}`,
    },
    { label: 'Add New Season', type: LINK_TYPE.ADD, link: `add_season` },
    {
      label: 'Add Player',
      type: LINK_TYPE.ADD,
      link: `add_player`,
    },
    {
      label: 'Add Trophy',
      type: LINK_TYPE.ADD,
      link: `add_trophy`,
    },
    { label: 'Edit Team', type: LINK_TYPE.EDIT, link: `edit` },
    {
      label: 'Edit Badge',
      type: LINK_TYPE.EDIT,
      link: `edit_badge`,
    },
  ];

  return (
    <RouteGuard authorization={AUTH_ROLES.PUBLIC}>
      <CustomAppBar
        title={PAGES.TEAM}
        actionButton={isTeamAuth && <EditLinksModal data={links} />}
      >
        <CustomTabs type={TAB_TYPES.TEAM} tabs={tabs} level="primary" />
      </CustomAppBar>
    </RouteGuard>
  );
};

export default Team;
