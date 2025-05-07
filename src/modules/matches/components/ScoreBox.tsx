import React from 'react';
import { Avatar } from '@mui/material';
import { CustomTypography } from 'components/typography';

type Props = {
  points: number;
  goals: number;
};

const ScoreBox: React.FC<Props> = ({ goals, points }) => {
  return (
    <Avatar
      variant="square"
      sx={{
        background: '#fff',
      }}
    >
      <CustomTypography bold size="lg" color="secondary">
        {goals}
      </CustomTypography>
    </Avatar>
  );
};

export default ScoreBox;
