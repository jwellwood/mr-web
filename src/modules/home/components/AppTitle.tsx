import { Typography } from '@mui/material';
import { CenteredGrid, GridItem } from '../../../components/grids';
import { CustomTypography } from '../../../components/typography';

export default function AppTitle() {
  return (
    <div style={{ textAlign: 'center', marginTop: '200px' }}>
      <CenteredGrid dir="row">
        <GridItem size={12}>
          <Typography
            sx={{ fontSize: '3rem', fontWeight: 'bold', textShadow: '0px 0px 50px #fff' }}
            color="label"
          >
            Footy
          </Typography>
        </GridItem>
        <GridItem size={12}>
          <Typography
            sx={{ fontSize: '3rem', fontWeight: 'bold', textShadow: '0px 0px 50px #fff' }}
            color="primary"
          >
            Stats
          </Typography>
        </GridItem>
        <GridItem size={12}>
          <CustomTypography color="data" size="md">
            Track your results and stats
          </CustomTypography>
        </GridItem>
      </CenteredGrid>
    </div>
  );
}
