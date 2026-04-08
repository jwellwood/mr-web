import { lazy } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { PageContainer } from '../../../components';
import { APP_ICONS, AppIcon, AppIconType } from '../../../components/icons';
import { CustomTabs, ITab } from '../../../components/tabs';
import { TAB_TYPES } from '../../../constants';
import { useAuth, useCustomParams } from '../../../hooks';
import { getTabIndex } from '../../../store';
import { getTeamAdminLinks } from '../helpers/getTeamAdminLinks';

const TeamOverview = lazy(() => import('../containers/Team'));
const SquadTabs = lazy(() => import('../../squad/main'));
const MatchesTabs = lazy(() => import('../../matches/main'));
const HistoryTabs = lazy(() => import('../components/HistoryTabs'));
const TeamHelp = lazy(() => import('../TeamHelp'));

export default function TeamPage() {
  const { t } = useTranslation('team');
  const { teamId } = useCustomParams();
  const { isTeamAuth } = useAuth(teamId);
  const { team } = useSelector(getTabIndex);

  const getIcon = (name: AppIconType, index: number) => (
    <AppIcon icon={name} size="20px" color={index === team ? 'primary' : 'label'} />
  );

  const tabs: ITab[] = [
    {
      label: t('TABS.OVERVIEW'),
      icon: getIcon(APP_ICONS.OVERVIEW, 0),
      component: <TeamOverview />,
    },
    {
      label: t('TABS.PLAYERS'),
      icon: getIcon(APP_ICONS.SQUAD, 1),
      component: <SquadTabs />,
    },
    {
      label: t('TABS.MATCHES'),
      icon: getIcon(APP_ICONS.MATCHES, 2),
      component: <MatchesTabs />,
    },
    {
      label: t('TABS.HISTORY'),
      icon: getIcon(APP_ICONS.TROPHY, 3),
      component: <HistoryTabs />,
    },
  ];

  return (
    <PageContainer
      title={t('PAGES.TEAM')}
      links={isTeamAuth ? getTeamAdminLinks(t) : undefined}
      help={<TeamHelp />}
    >
      <CustomTabs type={TAB_TYPES.TEAM} tabs={tabs} level="primary" />
    </PageContainer>
  );
}
