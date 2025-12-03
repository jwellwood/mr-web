import { Grid } from '@mui/material';
import { IResult } from '../types';
import { CustomTypography } from '../../../components/typography';

type Props = {
  result: IResult;
};

export default function ResultBox({ result }: Props) {
  const { homeTeam, awayTeam, homeGoals, awayGoals } = result;

  return (
    <Grid container direction="row" spacing={2}>
      <Grid size={5} textAlign="right">
        <CustomTypography color={homeGoals > awayGoals ? 'primary' : 'label'}>
          {homeTeam.teamName}
        </CustomTypography>
      </Grid>
      <CustomTypography color="data" bold>
        {homeGoals} - {awayGoals}
      </CustomTypography>
      <Grid size={5}>
        <CustomTypography color={awayGoals > homeGoals ? 'primary' : 'label'}>
          {awayTeam.teamName}
        </CustomTypography>
      </Grid>
    </Grid>
  );
}
