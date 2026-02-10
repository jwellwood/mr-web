import { useSelector } from 'react-redux';
import { SectionContainer } from '../../../../components';
import CustomStack from '../../../../components/grids/custom-stack/CustomStack';
import { CustomTypography } from '../../../../components/typography';
import { getTempMatch } from '../../../../store';
import { parseDate } from '../../../../utils';

export default function MatchOverview() {
  const currentMatch = useSelector(getTempMatch);
  const { teamName, opponentName, teamGoals, opponentGoals, date, isHome, competitionName } =
    currentMatch;
  const homeTeam = isHome ? teamName : opponentName;
  const awayTeam = !isHome ? teamName : opponentName;
  const homeScore = isHome ? teamGoals : opponentGoals;
  const awayScore = !isHome ? teamGoals : opponentGoals;

  return (
    <SectionContainer>
      <CustomStack>
        <CustomTypography color="primary" bold>
          {parseDate(date)}
        </CustomTypography>
        <CustomTypography color="label">{competitionName}</CustomTypography>
        <div>
          <CustomTypography color="label">{homeTeam}</CustomTypography>{' '}
          <CustomTypography color="data" bold>{`${homeScore}-${awayScore} `}</CustomTypography>
          <CustomTypography color="label">{awayTeam}</CustomTypography>
        </div>
      </CustomStack>
    </SectionContainer>
  );
}
