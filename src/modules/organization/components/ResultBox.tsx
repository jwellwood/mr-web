import { Grid } from '@mui/material';
import { IResult } from '../types';
import { CustomTypography } from '../../../components/typography';

interface Props {
  result: IResult;
}

export default function ResultBox({ result }: Props) {
  const { homeTeam, awayTeam, homeGoals, awayGoals } = result;

  return (
    <Grid container direction="row" spacing={1}>
      <Grid size={5} textAlign="right">
        <CustomTypography color={homeGoals > awayGoals ? 'primary' : 'label'}>
          {homeTeam.teamName}
        </CustomTypography>
      </Grid>
      <Grid size={2} textAlign="center" flexWrap="nowrap">
        <CustomTypography color="data" bold>
          {homeGoals} - {awayGoals}
        </CustomTypography>
      </Grid>
      <Grid size={5} textAlign="left">
        <CustomTypography color={awayGoals > homeGoals ? 'primary' : 'label'}>
          {awayTeam.teamName}
        </CustomTypography>
      </Grid>
    </Grid>
  );
}
