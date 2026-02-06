import { lazy } from 'react';

import { TAB_TYPES } from '../../constants';
import { CustomTabs, ITab } from '../../components/tabs';

const Matches = lazy(() => import('./containers/Matches'));
const MatchRecords = lazy(() => import('./containers/MatchRecords'));
const MatchOpponents = lazy(() => import('./containers/MatchOpponents'));
const MatchStatsWrapper = lazy(() => import('./components/matches-stats/MatchStatsWrapper'));

export default function MatchesTabs() {
  const tabs: ITab[] = [
    { label: 'Fixtures', component: <Matches /> },
    {
      label: 'Stats',
      component: <MatchStatsWrapper />,
    },
    {
      label: 'Opponents',
      component: <MatchOpponents />,
    },
    { label: 'Records', component: <MatchRecords /> },
  ];

  return <CustomTabs type={TAB_TYPES.MATCHES} tabs={tabs} level="secondary" />;
}
