import { CustomAvatar } from '../../../../components/avatars';
import { CustomTypography } from '../../../../components/typography';

interface Props {
  points: number;
  goals: number;
}

export default function ScoreBox({ goals }: Props) {
  return (
    <CustomAvatar variant="square" bgColor={'#fff'} size="45px">
      <CustomTypography bold size="lg" color="secondary">
        {goals}
      </CustomTypography>
    </CustomAvatar>
  );
}
