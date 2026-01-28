import { Avatar } from '@mui/material';

import { CustomTypography } from '../../../../components/typography';

interface Props {
  points: number;
  goals: number;
}

export default function ScoreBox({ goals }: Props) {
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
}
