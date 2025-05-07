import React, { useState } from 'react';
import { CustomSwitch } from 'components/inputs';
import AllTimeSquadStats from './AllTimeSquadStats';
import SquadStats from './SquadStats';

const SquadStatsContainer: React.FC = () => {
  const [showAllTimeStats, setShowAllTimeStats] = useState(false);
  const toggleView = () => {
    setShowAllTimeStats(!showAllTimeStats);
  };
  return (
    <>
      <CustomSwitch
        label="Show All Time Stats"
        placement="start"
        checked={showAllTimeStats}
        onCheck={toggleView}
      />
      {showAllTimeStats ? (
        <AllTimeSquadStats key="allTime" />
      ) : (
        <SquadStats key="season" />
      )}
    </>
  );
};

export default SquadStatsContainer;
