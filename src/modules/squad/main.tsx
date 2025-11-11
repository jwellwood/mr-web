import { lazy } from 'react';

import { TAB_TYPES } from '../../app/constants';
import { CustomTabs, ITab } from '../../components/tabs';

const Squad = lazy(() => import('./containers/Squad'));
const StatsTypeToggle = lazy(() => import('./components/StatsTypeToggle'));
const SquadRecords = lazy(() => import('./containers/SquadRecords'));
const PastPlayers = lazy(() => import('./containers/PastPlayers'));

export default function SquadTabs() {
  const tabs: ITab[] = [
    { label: 'Squad', component: <Squad /> },
    { label: 'Stats', component: <StatsTypeToggle /> },
    { label: 'Past Players', component: <PastPlayers /> },
    { label: 'Records', component: <SquadRecords /> },
  ];

  return <CustomTabs type={TAB_TYPES.SQUAD} tabs={tabs} level="secondary" />;
}
