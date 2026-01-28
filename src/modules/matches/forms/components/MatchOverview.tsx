import { useSelector } from 'react-redux';
import { SectionContainer } from '../../../../components';
import { CenteredGrid, GridItem } from '../../../../components/grids';
import { CustomTypography } from '../../../../components/typography';
import { getTempMatch } from '../../../../store';
import { parseDate } from '../../../../utils/helpers';

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
      <CenteredGrid>
        <CustomTypography color="primary">{parseDate(date)}</CustomTypography>{' '}
        <GridItem>
          <CustomTypography color="label">{homeTeam}</CustomTypography>{' '}
          <CustomTypography color="data" bold>{`${homeScore}-${awayScore} `}</CustomTypography>
          <CustomTypography color="label">{awayTeam}</CustomTypography>
        </GridItem>
        <CustomTypography color="label">{competitionName}</CustomTypography>
      </CenteredGrid>
    </SectionContainer>
  );
}
