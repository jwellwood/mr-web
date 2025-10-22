import { useState } from 'react';

import { CustomSwitch } from '../../../components/inputs';
import SquadStatsAllTime from '../containers/SquadStatsAllTime';
import SquadStatsSeason from '../containers/SquadStatsSeason';

export default function StatsTypeToggle() {
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
      {showAllTimeStats ? <SquadStatsAllTime key="allTime" /> : <SquadStatsSeason key="season" />}
    </>
  );
}
