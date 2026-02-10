import CustomStack from '../../../components/grids/custom-stack/CustomStack';
import { AppTitleText, CustomTypography } from '../../../components/typography';

export default function AppTitle() {
  return (
    <div style={{ textAlign: 'center', marginTop: '200px' }}>
      <CustomStack>
        <AppTitleText>Footy</AppTitleText>
        <AppTitleText color="primary">Stats</AppTitleText>

        <CustomTypography color="data" size="md">
          Track your results and stats
        </CustomTypography>
      </CustomStack>
    </div>
  );
}
