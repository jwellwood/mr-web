import { lazy } from 'react';

import { TAB_TYPES } from '../../constants';
import { CustomTabs, ITab } from '../../components/tabs';

const Squad = lazy(() => import('./containers/Squad'));
const SquadStats = lazy(() => import('./containers/SquadStats'));
const SquadRecords = lazy(() => import('./containers/SquadRecords'));
const SquadSingleSeasonRecords = lazy(() => import('./containers/SquadSingleSeasonRecords'));
const SquadMostGoalsInMatch = lazy(() => import('./containers/SquadMostGoalsInMatch'));
const SquadMostAssistsInMatch = lazy(() => import('./containers/SquadMostAssistsInMatch'));
const PastPlayers = lazy(() => import('./containers/PastPlayers'));

export default function SquadTabs() {
  const tabs: ITab[] = [
    { label: 'Squad', component: <Squad /> },
    { label: 'Stats', component: <SquadStats /> },
    { label: 'Past Players', component: <PastPlayers /> },
    {
      label: 'Records',
      component: (
        <>
          <SquadRecords />
          <SquadSingleSeasonRecords />
          <SquadMostGoalsInMatch />
          <SquadMostAssistsInMatch />
        </>
      ),
    },
  ];

  return <CustomTabs type={TAB_TYPES.SQUAD} tabs={tabs} level="secondary" />;
}
