import React from 'react';
import { CustomTypography } from 'components/typography';
import AllTimeMatchStats from './AllTimeMatchStats';
import MatchStats from './MatchStats';

const StatsContainer: React.FC = () => {
  return (
    <div>
      <CustomTypography bold color="label" size="xs">
        Current Season
      </CustomTypography>
      <MatchStats />
      <CustomTypography bold color="label" size="xs">
        All Time
      </CustomTypography>
      <AllTimeMatchStats />
    </div>
  );
};

export default StatsContainer;
