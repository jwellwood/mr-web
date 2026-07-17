import { T_FETCH_RESULT } from '../../modules/results/graphql';
import { CustomTypography } from '../typography';

interface Props {
  tiebreakType?: T_FETCH_RESULT['result']['decision'];
  size?: 'xs' | 'sm' | 'md' | 'lg';
}

export default function TiebreakerText({ tiebreakType, size = 'xs' }: Props) {
  const text = () => {
    switch (tiebreakType?.toUpperCase()) {
      case 'PENALTIES':
        return 'P';
      case 'EXTRA_TIME':
        return 'ET';
      default:
        return '';
    }
  };
  return (
    <CustomTypography color="primary" bold size={size}>
      {text()}
    </CustomTypography>
  );
}
