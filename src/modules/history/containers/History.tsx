import React from 'react';
import { TAB_TYPES } from 'app/constants';
import { CustomTabs, ITab } from 'components/tabs';
import HallOfFame from './HallOfFame';
import Seasons from './Seasons';
import Trophies from './Trophies';

const History: React.FC = () => {
  const tabs: ITab[] = [
    {
      label: 'Seasons',
      component: <Seasons />,
    },
    { label: 'Trophies', component: <Trophies /> },
    {
      label: 'Hall of Fame',
      component: <HallOfFame />,
    },
  ];

  return <CustomTabs type={TAB_TYPES.HISTORY} tabs={tabs} level="secondary" />;
};

export default History;
