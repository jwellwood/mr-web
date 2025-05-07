import React from 'react';
import { TAB_TYPES } from 'app/constants';
import { CustomTabs, ITab } from 'components/tabs';
import Matches from './Matches';
import MatchRecords from './MatchRecords';
import OpponentTable from './OpponentTable';
import StatsContainer from './StatsContainer';

const MatchesTabs: React.FC = () => {
  const tabs: ITab[] = [
    { label: 'Fixtures', component: <Matches /> },
    {
      label: 'Stats',
      component: <StatsContainer />,
    },

    {
      label: 'Opponents',
      component: <OpponentTable />,
    },
    { label: 'Records', component: <MatchRecords /> },
  ];

  return <CustomTabs type={TAB_TYPES.MATCHES} tabs={tabs} level="secondary" />;
};

export default MatchesTabs;
