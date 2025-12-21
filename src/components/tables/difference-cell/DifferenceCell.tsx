import { CustomTypography } from '../../typography';

type Props = {
  stat: number;
};

export default function DifferenceCell({ stat }: Props) {
  let symbol = '';
  let color = 'data';
  if (stat > 0) {
    color = 'success';
    symbol = '+';
  }
  if (stat < 0) {
    color = 'error';
    symbol = '';
  }
  return (
    <CustomTypography bold color={color} size="xs">
      {symbol}
      {stat}
    </CustomTypography>
  );
}
