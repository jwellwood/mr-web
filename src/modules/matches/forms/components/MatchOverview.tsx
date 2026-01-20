import { SectionContainer } from '../../../../components';
import { CenteredGrid, GridItem } from '../../../../components/grids';
import { CustomTypography } from '../../../../components/typography';
import { parseDate } from '../../../../utils/helpers';
import { ITempMatch } from '../../types';

interface Props {
  currentTempMatch: ITempMatch;
}

export default function MatchOverview({ currentTempMatch }: Props) {
  const { teamName, opponentName, teamGoals, opponentGoals, date, isHome, competition } =
    currentTempMatch;
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
        <CustomTypography color="label">{competition?.name}</CustomTypography>
      </CenteredGrid>
    </SectionContainer>
  );
}
