import { CustomTypography } from '../../../components/typography';
import AllTimeMatchStats from './AllTimeMatchStats';
import MatchStats from './MatchStats';

export default function StatsContainer() {
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
}
