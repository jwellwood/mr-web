import { lazy } from 'react';
import { TAB_TYPES } from '../../../../app/constants';
import { CustomTabs, ITab } from '../../../../components/tabs';

const PlayerAllTimeStats = lazy(() => import('./PlayerAllTimeStats'));
const PlayerHonors = lazy(() => import('./PlayerHonors'));
const PlayerSeasonStats = lazy(() => import('./PlayerSeasonStats'));
const PlayerVersus = lazy(() => import('./PlayerVersus'));

export default function PlayerTabs() {
  const tabs: ITab[] = [
    { label: 'Season', component: <PlayerSeasonStats /> },
    { label: 'All Time', component: <PlayerAllTimeStats /> },
    { label: 'Versus', component: <PlayerVersus /> },
    { label: 'Honors', component: <PlayerHonors /> },
  ];

  return <CustomTabs type={TAB_TYPES.PLAYER} tabs={tabs} level="primary" />;
}
