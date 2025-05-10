import React from 'react';
import { TAB_TYPES } from '../../../app/constants';
import { CustomTabs, ITab } from '../../../components/tabs';
import PastPlayers from './PastPlayers';
import Squad from './Squad';
import SquadRecords from './SquadRecords';
import SquadStatsContainer from './SquadStatsContainer';

const SquadTabs: React.FC = () => {
  const tabs: ITab[] = [
    { label: 'Squad', component: <Squad /> },
    { label: 'Stats', component: <SquadStatsContainer /> },
    { label: 'Past Players', component: <PastPlayers /> },
    { label: 'Records', component: <SquadRecords /> },
  ];

  return <CustomTabs type={TAB_TYPES.SQUAD} tabs={tabs} level="secondary" />;
};

export default SquadTabs;
