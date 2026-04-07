import { lazy } from 'react';
import { useTranslation } from 'react-i18next';
import { CustomTabs, ITab } from '../../components/tabs';
import { TAB_TYPES } from '../../constants';

const Matches = lazy(() => import('./containers/Matches'));
const MatchRecords = lazy(() => import('./containers/MatchRecords'));
const MatchOpponents = lazy(() => import('./containers/MatchOpponents'));
const MatchStatsWrapper = lazy(() => import('./components/matches-stats/MatchStatsWrapper'));

export default function MatchesTabs() {
  const { t } = useTranslation('matches');
  const tabs: ITab[] = [
    { label: t('TABS.FIXTURES'), component: <Matches /> },
    {
      label: t('TABS.STATS'),
      component: <MatchStatsWrapper />,
    },
    {
      label: t('TABS.OPPONENTS'),
      component: <MatchOpponents />,
    },
    { label: t('TABS.RECORDS'), component: <MatchRecords /> },
  ];

  return <CustomTabs type={TAB_TYPES.MATCHES} tabs={tabs} level="secondary" />;
}
