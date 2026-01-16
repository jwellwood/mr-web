import { lazy } from 'react';

import { TAB_TYPES } from '../../constants';
import { CustomTabs, ITab } from '../../components/tabs';
import SquadStats from './containers/SquadStats';

const Squad = lazy(() => import('./containers/Squad'));
const SquadRecords = lazy(() => import('./containers/SquadRecords'));
const PastPlayers = lazy(() => import('./containers/PastPlayers'));

export default function SquadTabs() {
  const tabs: ITab[] = [
    { label: 'Squad', component: <Squad /> },
    { label: 'Stats', component: <SquadStats /> },
    { label: 'Past Players', component: <PastPlayers /> },
    { label: 'Records', component: <SquadRecords /> },
  ];

  return <CustomTabs type={TAB_TYPES.SQUAD} tabs={tabs} level="secondary" />;
}
