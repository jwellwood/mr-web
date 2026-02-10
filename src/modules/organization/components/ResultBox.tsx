import { CustomGridContainer, CustomGridItem } from '../../../components/grids';
import { CustomTypography } from '../../../components/typography';
import { IResult } from '../types';

interface Props {
  result: IResult;
}

export default function ResultBox({ result }: Props) {
  const { homeTeam, awayTeam, homeGoals, awayGoals } = result;

  return (
    <CustomGridContainer>
      <CustomGridItem size={5} textAlign="right">
        <CustomTypography color={homeGoals > awayGoals ? 'primary' : 'label'}>
          {homeTeam.teamName}
        </CustomTypography>
      </CustomGridItem>
      <CustomGridItem size={2}>
        <CustomTypography color="data" bold>
          {homeGoals} - {awayGoals}
        </CustomTypography>
      </CustomGridItem>
      <CustomGridItem size={5} textAlign="left">
        <CustomTypography color={awayGoals > homeGoals ? 'primary' : 'label'}>
          {awayTeam.teamName}
        </CustomTypography>
      </CustomGridItem>
    </CustomGridContainer>
  );
}
