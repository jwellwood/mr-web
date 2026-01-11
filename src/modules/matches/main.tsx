import { lazy } from 'react';

import { TAB_TYPES } from '../../constants';
import { CustomTabs, ITab } from '../../components/tabs';

const Matches = lazy(() => import('./containers/Matches'));
const MatchRecords = lazy(() => import('./containers/MatchRecords'));
const MatchOpponents = lazy(() => import('./containers/MatchOpponents'));
const MatchStatsAllTime = lazy(() => import('./containers/MatchStatsAllTime'));
const MatchStatsSeason = lazy(() => import('./containers/MatchStatsSeason'));

export default function MatchesTabs() {
  const tabs: ITab[] = [
    { label: 'Fixtures', component: <Matches /> },
    {
      label: 'Stats',
      component: (
        <>
          <MatchStatsSeason />
          <MatchStatsAllTime />
        </>
      ),
    },

    {
      label: 'Opponents',
      component: <MatchOpponents />,
    },
    { label: 'Records', component: <MatchRecords /> },
  ];

  return <CustomTabs type={TAB_TYPES.MATCHES} tabs={tabs} level="secondary" />;
}
