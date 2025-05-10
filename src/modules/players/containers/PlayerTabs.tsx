import React from 'react';
import { TAB_TYPES } from '../../../app/constants';
import { CustomTabs, ITab } from '../../../components/tabs';
import PlayerAllTimeStats from './PlayerAllTimeStats';
import PlayerHonors from './PlayerHonors';
import PlayerSeasonStats from './PlayerSeasonStats';
import PlayerVersus from './PlayerVersus';

const PlayerTabs: React.FC = () => {
  const tabs: ITab[] = [
    { label: 'Season', component: <PlayerSeasonStats /> },
    { label: 'All Time', component: <PlayerAllTimeStats /> },
    { label: 'Versus', component: <PlayerVersus /> },
    { label: 'Honors', component: <PlayerHonors /> },
  ];

  return <CustomTabs type={TAB_TYPES.PLAYER} tabs={tabs} level="secondary" />;
};

export default PlayerTabs;
